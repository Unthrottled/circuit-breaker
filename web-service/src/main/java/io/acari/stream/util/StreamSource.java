package io.acari.stream.util;

import rx.Observable;
import rx.schedulers.Schedulers;

import java.util.concurrent.TimeUnit;

public class StreamSource {
    public static final int INTERVAL = 50;
    public static final Observable<Long> stream = Observable.interval(INTERVAL, TimeUnit.MILLISECONDS)
            .onBackpressureDrop()
            .subscribeOn(Schedulers.io());
}
