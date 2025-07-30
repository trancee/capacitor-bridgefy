package com.getcapacitor.community;

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
}
