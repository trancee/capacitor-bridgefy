package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;

public class FailToDestroySessionEvent extends FailToEvent {

    public FailToDestroySessionEvent(@NonNull String type, @NonNull Exception exception) {
        super(type, exception);
    }
}
