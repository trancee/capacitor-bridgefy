package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;

public class FailToEvent {

    @NonNull
    String type;

    @NonNull
    Exception exception;

    public FailToEvent(@NonNull String type, @NonNull Exception exception) {
        this.type = type;
        this.exception = exception;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        result.put("type", type);
        result.put("message", exception.getMessage());

        return result;
    }
}
