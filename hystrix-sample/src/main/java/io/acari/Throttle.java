package io.acari;

import io.acari.pojo.ThrottleParameters;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;

import static io.acari.RestControl.INTERVAL;

@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class Throttle {
    private static final int DEFAULT_SLEEP = 500;
    public static final int MILLIS_IN_SECOND = 1000;

    private int sleepyTime = DEFAULT_SLEEP;

    public Throttle() {
    }

    public <R> R whoaDoggy(R r) {
        if (sleepyTime > 0) {
            sleepyTime();
        }
        return r;
    }

    private void sleepyTime() {
        try {
            Thread.sleep(sleepyTime);
        } catch (InterruptedException ignored) {}
    }

    public int getSleepyTime() {
        return MILLIS_IN_SECOND / sleepyTime;
    }

    public void setSleepyTime(ThrottleParameters sleepyTime) {
        this.sleepyTime = convertToMilliseconds(sleepyTime.getRequestsPerSecond());
    }

    private int convertToMilliseconds(int requestsPerSecond) {
        return requestsPerSecond >= 100 ? 0 :  getDividen(requestsPerSecond) - INTERVAL;
    }

    private int getDividen(int requestsPerSecond) {
        return requestsPerSecond == 0 ? MILLIS_IN_SECOND : MILLIS_IN_SECOND / requestsPerSecond;
    }
}
