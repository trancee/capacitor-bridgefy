package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import java.util.UUID;

public class ProgressEvent extends MessageIDEvent {

    private final int position;
    private final int of;

    public ProgressEvent(@NonNull UUID messageID, int position, int of) {
        super(messageID);
        this.position = position;
        this.of = of;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = super.toJSObject();

        result.put("position", position);
        result.put("of", of);

        return result;
    }
}
