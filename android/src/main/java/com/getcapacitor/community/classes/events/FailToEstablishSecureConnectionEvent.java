package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.community.BridgefyController.Reason;
import java.util.UUID;

public class FailToEstablishSecureConnectionEvent extends FailToEvent {

    @NonNull
    UUID userID;

    public FailToEstablishSecureConnectionEvent(@NonNull UUID userID, @NonNull Reason reason) {
        super(reason);
        this.userID = userID;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        result.put("userID", userID.toString());
        result.put("reason", super.toJSObject());

        return result;
    }
}
