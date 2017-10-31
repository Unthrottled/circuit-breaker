package io.acari.pojo;

import io.acari.session.Session;

public class ThrottleParameters extends SessionParameters {
    private int requestsPerSecond;

    public ThrottleParameters() {
    }

    public ThrottleParameters(Session session) {
        super(session);
        setRequestsPerSecond(session.getRequestsPerSecond());
    }

    public int getRequestsPerSecond() {
        return requestsPerSecond;
    }

    public void setRequestsPerSecond(int requestsPerSecond) {
        this.requestsPerSecond = requestsPerSecond;
    }
}
