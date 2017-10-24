package io.acari;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.stereotype.Component;

import java.util.function.UnaryOperator;

@Component
public class HystrixCommandBean {
    public static final long FALL_BACK = -9001L;

    @HystrixCommand(fallbackMethod = "fallback")
    public Long processFunction(Long aLong, UnaryOperator<Long> unaryOperator) {
        return unaryOperator.apply(aLong);
    }


    public Long fallback(Long aLong, UnaryOperator<Long> unaryOperator) {
        return FALL_BACK;
    }

}
