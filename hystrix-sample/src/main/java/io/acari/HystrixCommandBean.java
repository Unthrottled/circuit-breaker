package io.acari;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.stereotype.Component;

import java.util.function.UnaryOperator;

@Component
public class HystrixCommandBean {

    @HystrixCommand(fallbackMethod = "thingsBroke")
    public Long processFunction(Long aLong, UnaryOperator<Long> unaryOperator) {
        return unaryOperator.apply(aLong);
    }


    public Long thingsBroke(Long aLong, UnaryOperator<Long> unaryOperator) {
        return -9001L;
    }

}
