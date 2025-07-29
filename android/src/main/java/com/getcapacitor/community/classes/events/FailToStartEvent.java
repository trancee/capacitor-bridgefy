package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;

public class FailToStartEvent extends FailToEvent {

    public FailToStartEvent(@NonNull String type, @NonNull Exception exception) {
        super(type, exception);
    }
}
