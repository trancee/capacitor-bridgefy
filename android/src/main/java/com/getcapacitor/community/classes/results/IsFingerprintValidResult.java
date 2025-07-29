package com.getcapacitor.community.classes.results;

import com.getcapacitor.JSObject;
import com.getcapacitor.community.interfaces.Result;

public class IsFingerprintValidResult implements Result {

    private final Boolean isValid;

    public IsFingerprintValidResult(Boolean isValid) {
        this.isValid = isValid;
    }

    @Override
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        if (isValid != null) result.put("isValid", isValid);

        return result;
    }
}
