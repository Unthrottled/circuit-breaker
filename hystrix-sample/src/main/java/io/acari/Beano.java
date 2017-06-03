package io.acari;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import io.acari.pojo.LatencyParameters;
import io.acari.pojo.LivenessParameters;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;

@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class Beano {
    private final static int DEFAULT_DELAY = 50;
    private int delay = DEFAULT_DELAY;
    private boolean liveness;

    public Beano() {
    }

    @HystrixCommand(fallbackMethod = "thingsBroke")
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

    public Long thingsBroke(Long aLong) {
        return -9001L;
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
