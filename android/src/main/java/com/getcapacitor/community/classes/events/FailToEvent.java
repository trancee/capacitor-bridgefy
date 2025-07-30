package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.community.BridgefyController.Error;

public class FailToEvent {

    @NonNull
    Error error;

    public FailToEvent(@NonNull Error error) {
        this.error = error;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        result.put("type", error.type());

        if (error.message() != null) {
            result.put("message", error.message());
        }

        if (error.code() != null) {
            result.put("code", error.code());
        }

        return result;
    }
}
