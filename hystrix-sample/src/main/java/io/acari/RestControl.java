package io.acari;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControl {
    private Beano beano;

    @Autowired
    public RestControl(Beano beano) {
        this.beano = beano;
    }

    @RequestMapping("/sillyBilly")
    public String sillyBilly() {
        return beano.getMessage();
    }
}
