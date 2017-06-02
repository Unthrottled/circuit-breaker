package io.acari;

import org.springframework.cloud.netflix.endpoint.ServletWrappingEndpoint;

public class MessageStreamEndpoint extends ServletWrappingEndpoint {
    public MessageStreamEndpoint(){
        super(MessageStreamServlet.class, "messageStream", "/message.stream", false, true);
    }
}
