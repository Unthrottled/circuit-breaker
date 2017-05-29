package io.acari;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Random;

@Component
public class Beano {
    private static final Logger logger = LoggerFactory.getLogger(Beano.class);
    private final Random ranbo = new Random(9001);

    @PostConstruct
    public void setUp() {
        logger.warn("NEATO BEANO BURRITO!");
    }

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
