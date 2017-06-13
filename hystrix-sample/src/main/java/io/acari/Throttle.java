package io.acari;

import io.acari.pojo.ThrottleParameters;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;

import static io.acari.RestControl.INTERVAL;

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
        return sleepyTime;
    }

    public void setSleepyTime(int sleepyTime) {
        this.sleepyTime = sleepyTime;
    }


}
