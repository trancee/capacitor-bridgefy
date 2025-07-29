package com.getcapacitor.community.classes.results;

import android.util.Base64;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.getcapacitor.JSObject;
import com.getcapacitor.community.interfaces.Result;

public class FingerprintResult implements Result {

    @Nullable
    private final byte[] fingerprint;

    public FingerprintResult(@Nullable byte[] fingerprint) {
        this.fingerprint = fingerprint;
    }

    @Override
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        if (fingerprint != null && fingerprint.length > 0) {
            result.put("fingerprint", Base64.encodeToString(fingerprint, Base64.NO_WRAP));
        }

        return result;
    }
}
