package io.acari;

import io.acari.pojo.LatencyParameters;
import io.acari.pojo.LivenessParameters;
import io.acari.pojo.ThrottleParameters;
import io.acari.session.IdRepository;
import io.acari.session.Session;
import io.acari.session.SessionRepository;
import io.acari.stream.util.StreamSource;
import io.acari.stream.util.Throttle;
import io.acari.stream.util.TroubleMaker;
import io.acari.util.ChainableOptional;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.Instant;

import static io.acari.HystrixCommandBean.FALL_BACK;
import static io.acari.pojo.Translator.*;

@RestController
@RequestMapping("/hystrix")
public class RestControl {
    private static final Log log = LogFactory.getLog(RestControl.class);
    private SessionRepository sessionRepository;
    private IdRepository idRepository;
    private HystrixCommandBean hystrixCommandBean;
    private final MessageSinkBean messageSinkBean;

    @Autowired
    public RestControl(SessionRepository sessionRepository, IdRepository idRepository, HystrixCommandBean hystrixCommandBean, MessageSinkBean messageSinkBean) {
        this.sessionRepository = sessionRepository;
        this.idRepository = idRepository;
        this.hystrixCommandBean = hystrixCommandBean;
        this.messageSinkBean = messageSinkBean;
    }

    @RequestMapping("/get/stream-id")
    public Long streamId() {
        Long ranbo = idRepository.getRanbo();
        sessionRepository.addSession(new Session(ranbo, new TroubleMaker(), new Throttle()));
        return ranbo;
    }

    @RequestMapping("/get/{sessionId}/throttle")
    public ResponseEntity<ThrottleParameters> getThrottleParameters(@PathVariable Long sessionId) {
        return sessionRepository.getSession(sessionId)
                .map(ThrottleParameters::new)
                .map(ResponseEntity::ok)
                .orElseGet(this::notFound);

    }

    @RequestMapping(value = "/post/{sessionId}/throttle", method = RequestMethod.POST)
    public ResponseEntity<ThrottleParameters> getThrottleParameters(@PathVariable Long sessionId, @RequestBody ThrottleParameters throttleParameters) {
        return sessionRepository.getSession(sessionId)
                .map(session -> {
                    int sleepyTimeInMilliseconds = calculateTimeToWait(throttleParameters.getRequestsPerSecond());
                    session.getThrottle().setSleepyTime(sleepyTimeInMilliseconds);
                    return session;
                })
                .map(ThrottleParameters::new)
                .map(ResponseEntity::ok)
                .orElseGet(this::notFound);

    }

    @RequestMapping("/get/{sessionId}/latency")
    public ResponseEntity<LatencyParameters> getLatencyParameters(@PathVariable Long sessionId) {
        return sessionRepository.getSession(sessionId)
                .map(LatencyParameters::new)
                .map(ResponseEntity::ok)
                .orElseGet(this::notFound);
    }

    @RequestMapping(value = "/post/{sessionId}/latency", method = RequestMethod.POST)
    public ResponseEntity<LatencyParameters> getLatencyParameters(@PathVariable Long sessionId, @RequestBody LatencyParameters latencyParameters) {
        return sessionRepository.getSession(sessionId)
                .map(session -> {
                    session.getTroubleMaker().setDelay(latencyParameters);
                    return session;
                })
                .map(LatencyParameters::new)
                .map(ResponseEntity::ok)
                .orElseGet(this::notFound);
    }

    @RequestMapping("/get/{sessionId}/liveness")
    public ResponseEntity<LivenessParameters> getLiveness(@PathVariable Long sessionId) {
        return sessionRepository.getSession(sessionId)
                .map(LivenessParameters::new)
                .map(ResponseEntity::ok)
                .orElseGet(this::notFound);
    }

    @RequestMapping("/post/{sessionId}/liveness")
    public ResponseEntity<LivenessParameters> getLiveness(@PathVariable Long sessionId, @RequestBody LivenessParameters livenessParameters) {
        return sessionRepository.getSession(sessionId)
                .map(session -> {
                    session.getTroubleMaker().setLiveness(livenessParameters);
                    return session;
                })
                .map(LivenessParameters::new)
                .map(ResponseEntity::ok)
                .orElseGet(this::notFound);

    }

    private <T> ResponseEntity<T> notFound() {
        return ResponseEntity.<T>notFound().build();
    }

    @RequestMapping("/{sessionId}/test.stream")
    public ResponseEntity<SseEmitter> testo(@PathVariable Long sessionId) {
        return sessionRepository.getSession(sessionId)
                .map(session -> {
                    SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
                    TroubleMaker troubleMaker = session.getTroubleMaker();
                    Throttle iCantDive55 = session.getThrottle();
                    StreamSource.stream
                            .map(iCantDive55::whoaDoggy)
                            .map(aLong -> {
                                Long result = hystrixCommandBean.messageFactory(aLong, troubleMaker::getMessage);
                                return "Message " + aLong + " " + (result == FALL_BACK ? "Failed. ☹️" : "Succeeded. ☺️");
                            })
                            .map(messageSinkBean::sendMessage)
                            .subscribe(aLong -> {
                                try {
                                    emitter.send(aLong + " @ " + Instant.now());
                                } catch (IOException | IllegalStateException e) {
                                    log.info("Issue sending message for session " + sessionId + " " + e.getMessage());
                                    throw new IllegalStateException("Listener stopped listening");
                                }
                            }, e -> {
                                ChainableOptional
                                        .ofNullable(e)
                                        .filter(t -> !(t instanceof IllegalStateException))
                                        .ifPresent(t -> log.error("An error occurred when sending messages.", t));
                                sessionRepository.removeSession(sessionId);
                                emitter.complete();
                            }, () -> {
                                try {
                                    emitter.send("Stream Complete.");
                                } catch (IOException | IllegalStateException e) {
                                } finally {
                                    emitter.complete();
                                    sessionRepository.removeSession(sessionId);
                                }
                            });
                    return emitter;
                })
                .map(ResponseEntity::ok)
                .orElseGet(this::notFound);
    }
}
