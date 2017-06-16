package io.acari.pojo;

import io.acari.session.Session;

public class LivenessParameters extends SessionParameters {
    private boolean serviceAlive;

    public LivenessParameters() {
    }

    public LivenessParameters(Session session) {
        super(session);
        setServiceAlive(session.getTroubleMaker().getLiveness());
    }

    public boolean isServiceAlive() {
        return serviceAlive;
    }

    public void setServiceAlive(boolean serviceAlive) {
        this.serviceAlive = serviceAlive;
    }
}
