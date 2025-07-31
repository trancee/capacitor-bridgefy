package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.community.BridgefyController.Reason;

public class FailToDestroySessionEvent extends FailToEvent {

    public FailToDestroySessionEvent(@NonNull Reason reason) {
        super(reason);
    }
}
