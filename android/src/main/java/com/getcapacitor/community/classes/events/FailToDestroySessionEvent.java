package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.community.BridgefyController.Error;

public class FailToDestroySessionEvent extends FailToEvent {

    public FailToDestroySessionEvent(@NonNull Error error) {
        super(error);
    }
}
