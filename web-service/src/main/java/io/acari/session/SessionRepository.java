package io.acari.session;

import io.acari.util.ChainableOptional;
import org.springframework.stereotype.Component;
import rx.Observable;
import rx.Observer;
import rx.Subscriber;

import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;

@Component
public class SessionRepository {
    private final ConcurrentHashMap<Long, Session> sessionConcurrentHashMap = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, Session> discardedSessions = new ConcurrentHashMap<>();

    public Observable<Session> getSession(Long id) {
        return Observable.just(sessionConcurrentHashMap.get(id))
                .filter(Objects::nonNull);
    }

    public Observable<Void> addSession(Session session) {
        sessionConcurrentHashMap.put(session.getId(), session);
        return Observable.empty();
    }

    public void discardSession(Session session) {
        ChainableOptional.ofNullable(sessionConcurrentHashMap.remove(session.getId()))
                .ifPresent(this::addDiscardedSession);
    }

    private void addDiscardedSession(Session session){
        discardedSessions.put(session.getId(), session);
    }

    public Observable<Session> getDiscardedSession() {
        return Observable.just(discardedSessions.entrySet().iterator())
                .filter(Iterator::hasNext)
                .map(Iterator::next)
                .filter(Objects::nonNull)
                .map(Map.Entry::getKey)
                .map(discardedSessions::remove)
                .filter(Objects::nonNull);
    }
}
