package io.acari;

import com.netflix.hystrix.HystrixObservableCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.stereotype.Component;
import rx.Observable;

import java.util.function.UnaryOperator;

public class MessageSinkBean extends HystrixObservableCommand<String> {
    private final String aString;


    public MessageSinkBean(Setter setter,
                           String aString) {
        super(setter);
        this.aString = aString;
    }

    @Override
    protected Observable<String> construct() {
        return observe();
    }

    @Override
    public Observable<String> observe() {
        return Observable.just(aString);
    }

    @Override
    protected Observable<String> resumeWithFallback() {
        return Observable.just("SHEEEEEEIIIIITTTTTTT");
    }
}

