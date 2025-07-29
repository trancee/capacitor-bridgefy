package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import java.util.UUID;

public class MessageIDEvent {

    @NonNull
    UUID messageID;

    public MessageIDEvent(@NonNull UUID messageID) {
        this.messageID = messageID;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        result.put("messageID", messageID.toString());

        return result;
    }
}
