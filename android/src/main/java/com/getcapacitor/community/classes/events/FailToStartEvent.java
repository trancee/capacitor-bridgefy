package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.community.BridgefyController.Error;

public class FailToStartEvent extends FailToEvent {

    public FailToStartEvent(@NonNull Error error) {
        super(error);
    }
}
