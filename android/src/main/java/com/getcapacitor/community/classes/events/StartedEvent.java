package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import java.util.UUID;

public class StartedEvent extends UserIDEvent {

    public StartedEvent(@NonNull UUID userID) {
        super(userID);
    }
}
