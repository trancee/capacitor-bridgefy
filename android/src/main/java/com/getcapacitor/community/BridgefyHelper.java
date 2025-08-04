package com.getcapacitor.community;

import android.content.Context;
import com.getcapacitor.JSObject;
import java.util.UUID;
import javax.annotation.Nullable;

public class BridgefyHelper {

    @Nullable
    public static Boolean makeBoolean(@Nullable String value) {
        if (value == null || value.isEmpty()) return null;

        try {
            return Boolean.parseBoolean(value);
        } catch (Exception ignored) {
            return null;
        }
    }

    @Nullable
    public static UUID makeUUID(@Nullable String value) {
        if (value == null || value.isEmpty()) return null;

        try {
            return UUID.fromString(value);
        } catch (Exception ignored) {
            return null;
        }
    }

    @Nullable
    public static JSObject makeEvent(@Nullable JSObject event) {
        return event != null ? new JSObject().put("event", event) : null;
    }

    @Nullable
    public static UUID getDeviceID(Context context) {
        /*
        // https://developer.android.com/identity/user-data-ids
        @SuppressLint("HardwareIds")
        String androidID = Secure.getString(context.getContentResolver(), Secure.ANDROID_ID).trim().toLowerCase();

        if (androidID.isEmpty() || "9774d56d682e549c".equals(androidID)) {
            return null;
        }

        return UUID.nameUUIDFromBytes(androidID.getBytes());
        */

        return null;
    }
}
