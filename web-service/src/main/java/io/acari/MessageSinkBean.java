package io.acari;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.stereotype.Component;

import java.util.function.UnaryOperator;

@Component
public class MessageSinkBean {
    private static final long FALL_BACK = -9001L;

    @HystrixCommand(fallbackMethod = "fallback", groupKey = "messageSink",
            threadPoolKey = "messageSink")
    public String sendMessage(String message) {
        return message;
    }


    public String fallback(String message) {
        return "SHEEEEEEIIIIITTTTTTT";
    }

}
