package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;

public class FailToStopEvent extends FailToEvent {

    public FailToStopEvent(@NonNull String type, @NonNull Exception exception) {
        super(type, exception);
    }
}
