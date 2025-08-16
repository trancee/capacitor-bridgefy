package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.community.BridgefyController.Reason;

public class FailToStartEvent extends FailToEvent {

    public FailToStartEvent(@NonNull Reason reason) {
        super(reason);
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        result.put("reason", super.toJSObject());

        return result;
    }
}
