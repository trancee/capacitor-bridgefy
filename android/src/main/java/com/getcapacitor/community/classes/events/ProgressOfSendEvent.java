package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import java.util.UUID;

public class ProgressOfSendEvent extends MessageIDEvent {

    private final int position;
    private final int total;

    public ProgressOfSendEvent(@NonNull UUID messageID, int position, int total) {
        super(messageID);
        this.position = position;
        this.total = total;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = super.toJSObject();

        result.put("position", position);
        result.put("total", total);

        return result;
    }
}
