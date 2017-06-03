package io.acari.pojo;

public class ThrottleParameters extends SessionParameters {
    private int requestsPerSecond;

    public int getRequestsPerSecond() {
        return requestsPerSecond;
    }

    public void setRequestsPerSecond(int requestsPerSecond) {
        this.requestsPerSecond = requestsPerSecond;
    }
}
