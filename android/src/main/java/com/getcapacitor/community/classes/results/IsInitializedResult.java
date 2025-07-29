package com.getcapacitor.community.classes.results;

import com.getcapacitor.JSObject;
import com.getcapacitor.community.interfaces.Result;

public class IsInitializedResult implements Result {

    private final Boolean isInitialized;

    public IsInitializedResult(Boolean isInitialized) {
        this.isInitialized = isInitialized;
    }

    @Override
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        if (isInitialized != null) result.put("isInitialized", isInitialized);

        return result;
    }
}
