package com.getcapacitor.community.classes.results;

import com.getcapacitor.JSObject;
import com.getcapacitor.community.interfaces.Result;

public class IsStartedResult implements Result {

    private final Boolean isStarted;

    public IsStartedResult(Boolean isStarted) {
        this.isStarted = isStarted;
    }

    @Override
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        if (isStarted != null) result.put("isStarted", isStarted);

        return result;
    }
}
