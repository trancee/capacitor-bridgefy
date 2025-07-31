package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.community.BridgefyController.Reason;

public class FailToEvent {

    @NonNull
    Reason reason;

    public FailToEvent(@NonNull Reason reason) {
        this.reason = reason;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        result.put("type", reason.type());

        if (reason.message() != null) {
            result.put("message", reason.message());
        }

        if (reason.code() != null) {
            result.put("code", reason.code());
        }

        return result;
    }
}
