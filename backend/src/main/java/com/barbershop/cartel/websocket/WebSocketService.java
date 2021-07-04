package com.barbershop.cartel.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    private final String WEB_SOCKET_TOPIC = "/topic/event-added";

    private final String UPDATE_MESSAGE_TO_CLIENT = "updated";

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void updateClientCalendars() {

        simpMessagingTemplate.convertAndSend(WEB_SOCKET_TOPIC, UPDATE_MESSAGE_TO_CLIENT);
    }
}
