package io.acari;

import rx.Observable;
import rx.Scheduler;
import rx.schedulers.Schedulers;

import java.util.concurrent.TimeUnit;

import static io.acari.RestControl.INTERVAL;

public class StreamSource {
    public static final Observable<Long> stream = Observable.interval(INTERVAL, TimeUnit.MILLISECONDS)
            .onBackpressureDrop()
            .subscribeOn(Schedulers.io());
}
