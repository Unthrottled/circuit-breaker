package io.acari.pojo;

import static io.acari.RestControl.INTERVAL;

public class Translator {
    public static final int MILLIS_IN_SECOND = 1000;

    public static int calculateRequestsPerSecond(int sleepyTime) {
        return MILLIS_IN_SECOND / (sleepyTime + INTERVAL);
    }

    public static int calculateTimeToWait(int requestsPerSecond) {
        return convertToMilliseconds(requestsPerSecond);
    }

    private static int convertToMilliseconds(int requestsPerSecond) {
        return requestsPerSecond >= 100 ? 0 : getDividen(requestsPerSecond) - INTERVAL;
    }

    private static int getDividen(int requestsPerSecond) {
        return requestsPerSecond <= 0 ? MILLIS_IN_SECOND : (int) Math.ceil(MILLIS_IN_SECOND / (double) requestsPerSecond);
    }
}
