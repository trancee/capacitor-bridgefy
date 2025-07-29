package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import java.util.UUID;

public class UserIDEvent {

    @NonNull
    UUID userID;

    public UserIDEvent(@NonNull UUID userID) {
        this.userID = userID;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        result.put("userID", userID.toString());

        return result;
    }
}
