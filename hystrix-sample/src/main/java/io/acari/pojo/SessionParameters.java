package io.acari.pojo;

import io.acari.session.Session;

public class SessionParameters {
    private Long sessionId;

    public SessionParameters() {
    }

    public SessionParameters(Session session) {
        setSessionId(session.getId());
    }


    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long sessionId) {
        this.sessionId = sessionId;
    }
}
