package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.community.BridgefyController.Reason;
import java.util.UUID;

public class FailToSendEvent extends FailToEvent {

    @NonNull
    UUID messageID;

    public FailToSendEvent(@NonNull UUID messageID, @NonNull Reason reason) {
        super(reason);
        this.messageID = messageID;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        result.put("messageID", messageID.toString());
        result.put("reason", super.toJSObject());

        return result;
    }
}
