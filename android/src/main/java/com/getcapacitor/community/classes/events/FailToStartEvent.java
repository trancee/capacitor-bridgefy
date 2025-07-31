package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.community.BridgefyController.Reason;

public class FailToStartEvent extends FailToEvent {

    public FailToStartEvent(@NonNull Reason reason) {
        super(reason);
    }
}
