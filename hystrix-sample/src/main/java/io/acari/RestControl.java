package io.acari;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import rx.Observable;
import rx.Subscriber;

import java.io.IOException;
import java.time.Instant;
import java.util.concurrent.TimeUnit;

@RestController
public class RestControl {
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

    @RequestMapping("/test.stream/{sessionId}")
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
        Observable.interval(10, TimeUnit.MILLISECONDS)
                .map(throttle::whoaDoggy)
                .map(beano::getMessage)
                .subscribe(subscriber);
        return emitter;
    }
}
