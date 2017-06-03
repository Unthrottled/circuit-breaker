package io.acari;

import io.acari.pojo.ThrottleParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import rx.Observable;
import rx.Subscriber;

import java.io.IOException;
import java.time.Instant;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@RestController
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
        return idRepository.getRanbo();
    }

    @RequestMapping("/get/{sessionId}/throttle")
    public ThrottleParameters getThrottleParameters(@PathVariable Long id){
        return new ThrottleParameters(sessionRepository.getSession(id));

    }

    @RequestMapping("/post/{sessionId}/throttle")
    public ThrottleParameters getThrottleParameters(@PathVariable Long id, @RequestBody ThrottleParameters throttleParameters){
        Session session = sessionRepository.getSession(id);
        session.getThrottle().setSleepyTime(throttleParameters);
        return new ThrottleParameters(session);

    }

    @RequestMapping("/{sessionId}/test.stream")
    public SseEmitter testo(@PathVariable Long id) {
        Session session = new Session(id, beano, throttle);
        sessionRepository.addSession(session);
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
        Observable.interval(INTERVAL, TimeUnit.MILLISECONDS)
                .map(throttle::whoaDoggy)
                .map(beano::getMessage)
                .subscribe(subscriber);
        return emitter;
    }
}
