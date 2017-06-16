package io.acari.pojo;

import io.acari.session.Session;

public class LatencyParameters extends SessionParameters {
    private int millisecondsDelay;

    public LatencyParameters() {
    }

    public LatencyParameters(Session session) {
        super(session);
        setMillisecondsDelay(session.getTroubleMaker().getDelay());
    }

    public int getMillisecondsDelay() {
        return millisecondsDelay;
    }

    public void setMillisecondsDelay(int millisecondsDelay) {
        this.millisecondsDelay = millisecondsDelay;
    }
}
