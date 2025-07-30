package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.community.BridgefyController.Error;

public class FailToStopEvent extends FailToEvent {

    public FailToStopEvent(@NonNull Error error) {
        super(error);
    }
}
