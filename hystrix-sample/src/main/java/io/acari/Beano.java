package io.acari;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Random;

@Component
public class Beano {
    private static final Logger logger = LoggerFactory.getLogger(Beano.class);
    private final Random ranbo = new Random(9001);

    @HystrixCommand(fallbackMethod = "fallback")
    public String getMessage() {
        try {
            Thread.sleep(ranbo.nextInt(500));
        } catch (InterruptedException ignored) {
        }
        return "THING WORKED, BRUV";
    }

    private String fallback() {
        return "THING BROKE";
    }
}
