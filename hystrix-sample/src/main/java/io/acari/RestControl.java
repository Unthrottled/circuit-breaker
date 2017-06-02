package io.acari;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    public RestControl(Beano beano) {
        this.beano = beano;
    }

    @RequestMapping("/sillyBilly")
    public String sillyBilly() {
        return beano.getMessage();
    }

    @RequestMapping("/test.stream")
    public SseEmitter testo() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        Observable.interval(100, TimeUnit.MILLISECONDS)
                .take(10).subscribe(new Subscriber<Long>() {
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
                    emitter.send("Shit Broke");
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
        });
        return emitter;
    }
}
