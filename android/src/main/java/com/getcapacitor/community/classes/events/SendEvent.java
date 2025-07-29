package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import java.util.UUID;

public class SendEvent extends MessageIDEvent {

    public SendEvent(@NonNull UUID messageID) {
        super(messageID);
    }
}
