package io.acari.session;

import io.acari.stream.util.Throttle;
import io.acari.stream.util.TroubleMaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SessionManager {
    private final SessionRepository sessionRepository;
    private final IdRepository idRepository;

    @Autowired
    public SessionManager(SessionRepository sessionRepository, IdRepository idRepository) {
        this.sessionRepository = sessionRepository;
        this.idRepository = idRepository;
    }

    public Session fetchUnusedSession() {
        Session unusedSession = sessionRepository.getDiscardedSession()
                .defaultIfEmpty(new Session(idRepository.getRanbo(), new TroubleMaker(), new Throttle()))
                //TODO: SWITCH TO SPRING 5 SO REST ENPOINTS CAN BE REACTIVE.
                .toBlocking().first();
        sessionRepository.addSession(unusedSession);
        return unusedSession;
    }


    public void discardSession(Session session) {
        sessionRepository.discardSession(session);
    }
}
