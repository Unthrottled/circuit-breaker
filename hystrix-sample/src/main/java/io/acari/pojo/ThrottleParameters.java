package io.acari.pojo;

import io.acari.session.Session;

import static io.acari.RestControl.INTERVAL;
import static io.acari.stream.util.Throttle.MILLIS_IN_SECOND;

public class ThrottleParameters extends SessionParameters {
    private int requestsPerSecond;

    public ThrottleParameters(){
    }

    public ThrottleParameters(Session session) {
        super(session);
        setRequestsPerSecond(session.getThrottle().calculateRequestsPerSecond());
    }

    public int getRequestsPerSecond() {
        return requestsPerSecond;
    }

    public void setRequestsPerSecond(int requestsPerSecond) {
        this.requestsPerSecond = requestsPerSecond;
    }

    public int calculateTimeToWait() {
        return convertToMilliseconds(getRequestsPerSecond());
    }

    private int convertToMilliseconds(int requestsPerSecond) {
        return requestsPerSecond >= 100 ? 0 : getDividen(requestsPerSecond) - INTERVAL;
    }

    private int getDividen(int requestsPerSecond) {
        return requestsPerSecond <= 0 ? MILLIS_IN_SECOND : (int) Math.ceil(MILLIS_IN_SECOND / (double) requestsPerSecond);
    }
}
