package io.acari;

import io.acari.pojo.LatencyParameters;
import io.acari.pojo.LivenessParameters;
import io.acari.pojo.ThrottleParameters;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import rx.Subscriber;

import java.io.IOException;
import java.time.Instant;

@RestController
@RequestMapping("/hystrix")
public class RestControl {
    public static final int INTERVAL = 10;
    private static final Log log = LogFactory.getLog(RestControl.class);
    private SessionRepository sessionRepository;
    private IdRepository idRepository;
    private HystrixCommandBean hystrixCommandBean;

    @Autowired
    public RestControl(SessionRepository sessionRepository, IdRepository idRepository, HystrixCommandBean hystrixCommandBean) {
        this.sessionRepository = sessionRepository;
        this.idRepository = idRepository;
        this.hystrixCommandBean = hystrixCommandBean;
    }

    @RequestMapping("/get/stream-id")
    public Long streamId() {
        Long ranbo = idRepository.getRanbo();
        sessionRepository.addSession(new Session(ranbo, new Beano(), new Throttle()));
        return ranbo;
    }

    @RequestMapping("/get/{sessionId}/throttle")
    public ThrottleParameters getThrottleParameters(@PathVariable Long sessionId) {
        return new ThrottleParameters(sessionRepository.getSession(sessionId));

    }

    @RequestMapping(value = "/post/{sessionId}/throttle", method = RequestMethod.POST)
    public ThrottleParameters getThrottleParameters(@PathVariable Long sessionId, @RequestBody ThrottleParameters throttleParameters) {
        Session session = sessionRepository.getSession(sessionId);
        session.getThrottle().setSleepyTime(throttleParameters.calculateTimeToWait());
        return new ThrottleParameters(session);

    }

    @RequestMapping("/get/{sessionId}/latency")
    public LatencyParameters getLatencyParameters(@PathVariable Long sessionId) {
        return new LatencyParameters(sessionRepository.getSession(sessionId));
    }

    @RequestMapping(value = "/post/{sessionId}/latency", method = RequestMethod.POST)
    public LatencyParameters getLatencyParameters(@PathVariable Long sessionId, @RequestBody LatencyParameters latencyParameters) {
        Session session = sessionRepository.getSession(sessionId);
        session.getBeano().setDelay(latencyParameters);
        return new LatencyParameters(session);
    }

    @RequestMapping("/get/{sessionId}/liveness")
    public LivenessParameters getLiveness(@PathVariable Long sessionId) {
        return new LivenessParameters(sessionRepository.getSession(sessionId));
    }

    @RequestMapping("/post/{sessionId}/liveness")
    public LivenessParameters getLiveness(@PathVariable Long sessionId, @RequestBody LivenessParameters livenessParameters) {
        Session session = sessionRepository.getSession(sessionId);
        session.getBeano().setLiveness(livenessParameters);
        return new LivenessParameters(session);
    }

    @RequestMapping("/{sessionId}/test.stream")
    public SseEmitter testo(@PathVariable Long sessionId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        Subscriber<Long> subscriber = new Subscriber<Long>() {
            @Override
            public void onCompleted() {
                try {
                    emitter.send("All dun");
                } catch (IOException e) {
                } finally {
                    emitter.complete();
                    sessionRepository.removeSession(sessionId);
                }
            }

            @Override
            public void onError(Throwable e) {
                log.error("shit broke", e);
                emitter.complete();
            }

            @Override
            public void onNext(Long aLong) {
                try {
                    emitter.send(aLong + " @ " + Instant.now());
                } catch (IOException e) {
                }
            }
        };
        Session session = sessionRepository.getSession(sessionId);
        Beano beanBurrito = session.getBeano();
        Throttle iCantDive55 = session.getThrottle();
        StreamSource.stream.map(iCantDive55::whoaDoggy)
                .map(aLong -> hystrixCommandBean.processFunction(aLong, beanBurrito::getMessage))
                .subscribe(subscriber);
        return emitter;
    }
}
