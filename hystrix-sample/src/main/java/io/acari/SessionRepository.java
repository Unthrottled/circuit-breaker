package io.acari;

import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SessionRepository {
    private final ConcurrentHashMap<Long, Session> sessionConcurrentHashMap = new ConcurrentHashMap<>();

    public Session getSession(Long id){
        return sessionConcurrentHashMap.get(id);
    }

    public void addSession(Session session){
        sessionConcurrentHashMap.put(session.getId(), session);
    }

    public boolean removeSession(Long id){
        return Objects.nonNull(sessionConcurrentHashMap.remove(id));
    }
}
