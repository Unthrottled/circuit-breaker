package io.acari;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class Session {
    private final Long id;
    private final Beano beano;
    private final Throttle throttle;
    private final SseEmitter sseEmitter;

    public Session(Long id, Beano beano, Throttle throttle, SseEmitter sseEmitter) {
        this.id = id;
        this.beano = beano;
        this.throttle = throttle;
        this.sseEmitter = sseEmitter;
    }

    public Long getId() {
        return id;
    }

    public Beano getBeano() {
        return beano;
    }

    public Throttle getThrottle() {
        return throttle;
    }

    public SseEmitter getSseEmitter() {
        return sseEmitter;
    }
}
