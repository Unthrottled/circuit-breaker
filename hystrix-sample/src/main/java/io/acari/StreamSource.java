package io.acari;

import java.util.concurrent.TimeUnit;

import static io.acari.RestControl.INTERVAL;

public class StreamSource {
    public static final rx.Observable<Long> stream = rx.Observable.interval(INTERVAL, TimeUnit.MILLISECONDS)
            .onBackpressureDrop();
}
