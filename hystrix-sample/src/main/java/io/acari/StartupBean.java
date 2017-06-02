package io.acari;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class StartupBean {
    private Beano beano;

    public StartupBean(Beano beano) {
        this.beano = beano;
    }

    @PostConstruct
    public void doStuff(){
        beano.getMessage();
    }
}
