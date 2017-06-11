package io.acari;

import io.acari.pojo.LatencyParameters;
import io.acari.pojo.LivenessParameters;
import io.acari.pojo.ThrottleParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import rx.Observable;
import rx.Subscriber;

import java.io.IOException;
import java.time.Instant;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/hystrix")
public class RestControl {
    public static final int INTERVAL = 10;
    private Beano beano;
    private Throttle throttle;
    private SessionRepository sessionRepository;
    private IdRepository idRepository;

    @Autowired
    public RestControl(Beano beano, Throttle throttle, SessionRepository sessionRepository, IdRepository idRepository) {
        this.beano = beano;
        this.throttle = throttle;
        this.sessionRepository = sessionRepository;
        this.idRepository = idRepository;
    }

    @RequestMapping("/get/stream-id")
    public Long streamId(){
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        Subscriber<Long> subscriber = new Subscriber<Long>() {
            @Override
            public void onCompleted() {
                try {
                    emitter.send("All dun");
                } catch (IOException e) {
                    e.printStackTrace();
                } finally {
                    emitter.complete();
                }
            }

            @Override
            public void onError(Throwable e) {
                try {
                    emitter.send("Shit Broke " + e.getMessage());
                    emitter.complete();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }

            @Override
            public void onNext(Long aLong) {
                try {
                    emitter.send(aLong + " @ " + Instant.now());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        };
        StreamSource.stream.map(throttle::whoaDoggy)
                .map(beano::getMessage)
                .subscribe(subscriber);

        Long ranbo = idRepository.getRanbo();
        sessionRepository.addSession(new Session(ranbo, beano, throttle, emitter));
        return ranbo;
    }

    @RequestMapping("/get/{sessionId}/throttle")
    public ThrottleParameters getThrottleParameters(@PathVariable Long sessionId){
        return new ThrottleParameters(sessionRepository.getSession(sessionId));

    }

    @RequestMapping(value = "/post/{sessionId}/throttle", method = RequestMethod.POST)
    public ThrottleParameters getThrottleParameters(@PathVariable Long sessionId, @RequestBody ThrottleParameters throttleParameters){
        Session session = sessionRepository.getSession(sessionId);
        session.getThrottle().setSleepyTime(throttleParameters);
        return new ThrottleParameters(session);

    }

    @RequestMapping("/get/{sessionId}/latency")
    public LatencyParameters getLatencyParameters(@PathVariable Long id){
        return new LatencyParameters(sessionRepository.getSession(id));
    }

    @RequestMapping(value = "/post/{sessionId}/latency", method = RequestMethod.POST)
    public LatencyParameters getLatencyParameters(@PathVariable Long id, @RequestBody LatencyParameters latencyParameters){
        Session session = sessionRepository.getSession(id);
        session.getBeano().setDelay(latencyParameters);
        return new LatencyParameters(session);
    }

    @RequestMapping("/get/{sessionId}/liveness")
    public LivenessParameters getLiveness(@PathVariable Long sessionId){
        return new LivenessParameters(sessionRepository.getSession(sessionId));
    }

    @RequestMapping("/post/{sessionId}/liveness")
    public LivenessParameters getLiveness(@PathVariable Long sessionId, @RequestBody LivenessParameters livenessParameters){
        Session session = sessionRepository.getSession(sessionId);
        session.getBeano().setLiveness(livenessParameters);
        return new LivenessParameters(session);
    }

    @RequestMapping("/{sessionId}/test.stream")
    public SseEmitter testo(@PathVariable Long sessionId) {
        return sessionRepository.getSession(sessionId).getSseEmitter();
    }
}
