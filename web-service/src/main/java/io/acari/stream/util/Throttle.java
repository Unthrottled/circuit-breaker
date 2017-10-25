package io.acari.stream.util;

public class Throttle {
    private static final int DEFAULT_SLEEP = 500;
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
        } catch (InterruptedException ignored) {
        }
    }

    public int getSleepyTime() {
        return sleepyTime;
    }

    public void setSleepyTime(int sleepyTimeInMilliseconds) {
        this.sleepyTime = sleepyTimeInMilliseconds;
    }


}
