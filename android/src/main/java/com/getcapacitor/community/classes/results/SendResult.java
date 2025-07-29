package com.getcapacitor.community.classes.results;

import com.getcapacitor.JSObject;
import com.getcapacitor.community.interfaces.Result;
import java.util.UUID;

public class SendResult implements Result {

    private final UUID messageID;

    public SendResult(UUID messageID) {
        this.messageID = messageID;
    }

    @Override
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        if (messageID != null) result.put("messageID", messageID);

        return result;
    }
}
