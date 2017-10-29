package io.acari;

import com.netflix.hystrix.HystrixObservableCommand;
import rx.Observable;

import java.util.function.UnaryOperator;

public class HystrixCommandBean extends HystrixObservableCommand<Long> {
    public static final long FALL_BACK = -9001L;
    private Long aLong;
    private final UnaryOperator<Long> unaryOperator;


    public HystrixCommandBean(Setter setter,
                              UnaryOperator<Long> unaryOperator) {
        super(setter);
        this.unaryOperator = unaryOperator;
    }

    @Override
    protected Observable<Long> construct() {
        return observe();
    }

    @Override
    public Observable<Long> observe(){
        return Observable.just(unaryOperator.apply(aLong));
    }

    public HystrixCommandBean setContent(Long aLong){
        this.aLong = aLong;
        return this;
    }

    @Override
    protected Observable<Long> resumeWithFallback() {
        return Observable.just(FALL_BACK);
    }
}