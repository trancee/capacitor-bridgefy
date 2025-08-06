package com.getcapacitor.community.classes.events;

import android.util.Base64;
import android.util.Pair;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.getcapacitor.JSObject;
import java.util.UUID;

public class ReceiveEvent extends MessageIDEvent {

    @Nullable
    private final byte[] data;

    @Nullable
    private final Pair<String, UUID> transmissionMode;

    public ReceiveEvent(@NonNull UUID messageID, @Nullable byte[] data, @Nullable Pair<String, UUID> transmissionMode) {
        super(messageID);
        this.data = data;
        this.transmissionMode = transmissionMode;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = super.toJSObject();

        if (data != null && data.length > 0) {
            result.put("data", Base64.encodeToString(data, Base64.NO_WRAP));
        }

        if (transmissionMode != null) {
            JSObject jsTransmissionMode = new JSObject();

            jsTransmissionMode.put("type", transmissionMode.first);
            jsTransmissionMode.put("uuid", transmissionMode.second);

            result.put("transmissionMode", jsTransmissionMode);
        }

        return result;
    }
}
