package io.acari.pojo;

public class LivenessParameters extends SessionParameters {
    private boolean serviceAlive;

    public boolean isServiceAlive() {
        return serviceAlive;
    }

    public void setServiceAlive(boolean serviceAlive) {
        this.serviceAlive = serviceAlive;
    }
}
