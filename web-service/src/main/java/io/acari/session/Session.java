package io.acari.session;

import com.netflix.hystrix.HystrixCommandGroupKey;
import com.netflix.hystrix.HystrixCommandKey;
import com.netflix.hystrix.HystrixObservableCommand;
import io.acari.stream.util.Throttle;
import io.acari.stream.util.TroubleMaker;

public class Session {
    private final Long id;
    private final TroubleMaker troubleMaker;
    private final Throttle throttle;
    private final HystrixObservableCommand.Setter commandSetter;

    public Session(Long id, TroubleMaker troubleMaker, Throttle throttle) {
        this.id = id;
        this.troubleMaker = troubleMaker;
        this.throttle = throttle;
        this.commandSetter =
                HystrixObservableCommand.Setter
                        .withGroupKey(HystrixCommandGroupKey.Factory.asKey("ExampleGroup"))
                .andCommandKey(HystrixCommandKey.Factory.asKey("messageFactory" + id));
    }

    public Long getId() {
        return id;
    }

    public TroubleMaker getTroubleMaker() {
        return troubleMaker;
    }

    public Throttle getThrottle() {
        return throttle;
    }

    public HystrixObservableCommand.Setter getCommandSetter(){
        return commandSetter;
    }

}
