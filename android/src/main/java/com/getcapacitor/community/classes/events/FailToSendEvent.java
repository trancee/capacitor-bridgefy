package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.community.BridgefyController.Error;
import java.util.UUID;

public class FailToSendEvent extends FailToEvent {

    @NonNull
    UUID messageID;

    public FailToSendEvent(@NonNull UUID messageID, @NonNull Error error) {
        super(error);
        this.messageID = messageID;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = super.toJSObject();

        result.put("messageID", messageID.toString());

        return result;
    }
}
