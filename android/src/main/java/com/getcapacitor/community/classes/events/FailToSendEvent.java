package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import java.util.UUID;

public class FailToSendEvent extends FailToEvent {

    @NonNull
    UUID messageID;

    public FailToSendEvent(@NonNull UUID messageID, @NonNull String type, @NonNull Exception exception) {
        super(type, exception);
        this.messageID = messageID;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = super.toJSObject();

        result.put("messageID", messageID.toString());

        return result;
    }
}
