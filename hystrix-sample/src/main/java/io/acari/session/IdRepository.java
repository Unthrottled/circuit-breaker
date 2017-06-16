package io.acari.session;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class IdRepository {
    private final SecureRandom secureRandom = new SecureRandom();

    public Long getRanbo(){
        return (long) secureRandom.nextInt();
    }
}
