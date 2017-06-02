package io.acari;

public class Throttle {
    private static final int DEFAULT_SLEEP = 200;

    private int sleepyTime = DEFAULT_SLEEP;


    public <R> R whoaDoggy(R r) {
        try {
            Thread.sleep(sleepyTime);
        } catch (InterruptedException e) {
        }
        return r;
    }

    public int getSleepyTime() {
        return sleepyTime;
    }

    public void setSleepyTime(int sleepyTime) {
        this.sleepyTime = sleepyTime;
    }
}
