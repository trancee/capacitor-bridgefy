package com.getcapacitor.community.classes.results;

import com.getcapacitor.JSObject;
import com.getcapacitor.community.interfaces.Result;
import java.util.UUID;

public class CurrentUserIDResult implements Result {

    private final UUID userID;

    public CurrentUserIDResult(UUID userID) {
        this.userID = userID;
    }

    @Override
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        if (userID != null) result.put("userID", userID);

        return result;
    }
}
