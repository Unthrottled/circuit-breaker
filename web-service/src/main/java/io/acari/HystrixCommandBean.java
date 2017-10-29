package io.acari;

import com.netflix.hystrix.HystrixObservableCommand;
import rx.Observable;

import java.util.function.UnaryOperator;

public class HystrixCommandBean extends HystrixObservableCommand<Long> {
    public static final long FALL_BACK = -9001L;
    private final Long aLong;
    private final UnaryOperator<Long> unaryOperator;


    public HystrixCommandBean(Setter setter,
                              Long aLong,
                              UnaryOperator<Long> unaryOperator) {
        super(setter);
        this.aLong = aLong;
        this.unaryOperator = unaryOperator;
    }

    @Override
    protected Observable<Long> construct() {
        return Observable.just(unaryOperator.apply(aLong));
    }

    @Override
    protected Observable<Long> resumeWithFallback() {
        return Observable.just(FALL_BACK);
    }
}