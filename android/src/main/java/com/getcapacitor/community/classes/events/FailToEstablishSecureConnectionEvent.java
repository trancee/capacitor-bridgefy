package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import com.getcapacitor.community.BridgefyController.Error;
import java.util.UUID;

public class FailToEstablishSecureConnectionEvent extends FailToEvent {

    @NonNull
    UUID userID;

    public FailToEstablishSecureConnectionEvent(@NonNull UUID userID, @NonNull Error error) {
        super(error);
        this.userID = userID;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = super.toJSObject();

        result.put("userID", userID.toString());

        return result;
    }
}
