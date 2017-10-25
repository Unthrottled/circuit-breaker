package io.acari.stream.util;

import io.acari.pojo.LatencyParameters;
import io.acari.pojo.LivenessParameters;

public class TroubleMaker {
    private final static int DEFAULT_DELAY = 50;
    private int delay = DEFAULT_DELAY;
    private boolean liveness = true;

    public Long getMessage(Long aLong) {
        if(!liveness){
            throw new IllegalStateException("I AM DEAD");
        }
        if (delay > 0) {
            sleepyTime();
        }
        return aLong;
    }

    private void sleepyTime() {
        try {
            Thread.sleep(delay);
        } catch (InterruptedException ignored) {
        }
    }

    public int getDelay() {
        return delay;
    }

    public void setDelay(LatencyParameters delay) {
        this.delay = delay.getMillisecondsDelay();
    }

    public void setLiveness(LivenessParameters liveness) {
        this.liveness = liveness.isServiceAlive();
    }

    public boolean getLiveness() {
        return liveness;
    }
}
