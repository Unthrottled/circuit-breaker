package io.acari.pojo;

public class LatencyParameters extends SessionParameters {
    private int millisecondsDelay;

    public int getMillisecondsDelay() {
        return millisecondsDelay;
    }

    public void setMillisecondsDelay(int millisecondsDelay) {
        this.millisecondsDelay = millisecondsDelay;
    }
}
