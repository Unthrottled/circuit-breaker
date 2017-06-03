package io.acari.pojo;


import java.time.ZonedDateTime;

public class Message {
    private String message;
    private ZonedDateTime timeStamp;

    public Message() {
    }

    public Message(String message, ZonedDateTime timeStamp) {
        this.message = message;
        this.timeStamp = timeStamp;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ZonedDateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(ZonedDateTime timeStamp) {
        this.timeStamp = timeStamp;
    }
}
