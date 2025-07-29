package com.getcapacitor.community.classes.events;

import static com.getcapacitor.community.BridgefyHelper.TransmissionMode;

import android.util.Base64;
import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import java.util.UUID;

public class ReceiveDataEvent extends MessageIDEvent {

    private final byte[] data;
    private final TransmissionMode transmissionMode;

    public ReceiveDataEvent(@NonNull UUID messageID, byte[] data, TransmissionMode transmissionMode) {
        super(messageID);
        this.data = data;
        this.transmissionMode = transmissionMode;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = super.toJSObject();

        if (data.length > 0) {
            result.put("data", Base64.encodeToString(data, Base64.NO_WRAP));
        }

        if (transmissionMode != null) {
            JSObject jsTransmissionMode = new JSObject();

            jsTransmissionMode.put("type", transmissionMode.type());
            jsTransmissionMode.put("uuid", transmissionMode.uuid());

            result.put("transmissionMode", jsTransmissionMode);
        }

        return result;
    }
}
