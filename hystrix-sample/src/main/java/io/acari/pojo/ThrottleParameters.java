package io.acari.pojo;

import io.acari.Session;

public class ThrottleParameters extends SessionParameters {
    private int requestsPerSecond;

    public ThrottleParameters(Session session) {
        setSessionId(session.getId());
        setRequestsPerSecond(session.getThrottle().getSleepyTime());
    }

    public int getRequestsPerSecond() {
        return requestsPerSecond;
    }

    public void setRequestsPerSecond(int requestsPerSecond) {
        this.requestsPerSecond = requestsPerSecond;
    }
}
