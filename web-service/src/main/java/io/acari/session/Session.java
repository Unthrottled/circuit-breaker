package io.acari.session;

import io.acari.stream.util.Throttle;
import io.acari.stream.util.TroubleMaker;

public class Session {
    private final Long id;
    private final TroubleMaker troubleMaker;
    private final Throttle throttle;

    public Session(Long id, TroubleMaker troubleMaker, Throttle throttle) {
        this.id = id;
        this.troubleMaker = troubleMaker;
        this.throttle = throttle;
    }

    public Long getId() {
        return id;
    }

    public TroubleMaker getTroubleMaker() {
        return troubleMaker;
    }

    public Throttle getThrottle() {
        return throttle;
    }

}
