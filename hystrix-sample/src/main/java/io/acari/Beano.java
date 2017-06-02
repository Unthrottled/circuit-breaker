package io.acari;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.Random;

@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class Beano {
    private static final Logger logger = LoggerFactory.getLogger(Beano.class);
    private final Random ranbo = new Random(9001);

    @HystrixCommand(fallbackMethod = "thingsBroke")
    public Long getMessage(Long aLong) {
        try {
            Thread.sleep(ranbo.nextInt(200));
        } catch (InterruptedException ignored) {
        }
        return aLong;
    }

    public Long thingsBroke(Long aLong) {
        return -9001L;
    }

    @PostConstruct
    public void init() {
        logger.info("start request");
    }

    @PreDestroy
    public void onDestroy() {
        logger.info("ends request");
    }
}
