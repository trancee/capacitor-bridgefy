package com.getcapacitor.community.classes.options;

import static com.getcapacitor.community.BridgefyHelper.makeUUID;

import android.util.Base64;
import android.util.Pair;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import java.util.UUID;

public class SendOptions {

    @Nullable
    private byte[] data;

    @Nullable
    private Pair<String, UUID> transmissionMode;

    public SendOptions(PluginCall call) {
        @Nullable
        String data = call.getString("data");
        this.setData(data);

        @Nullable
        JSObject transmissionMode = call.getObject("transmissionMode");
        if (transmissionMode != null) {
            String type = transmissionMode.getString("type");
            String uuid = transmissionMode.getString("uuid");
            if (type != null && !type.isEmpty() && uuid != null && !uuid.isEmpty()) {
                this.setTransmissionMode(type, makeUUID(uuid));
            }
        }
    }

    private void setData(@Nullable String data) {
        this.data = (data == null || data.isEmpty()) ? null : Base64.decode(data, Base64.NO_WRAP);
    }

    private void setTransmissionMode(@NonNull String type, @Nullable UUID uuid) {
        this.transmissionMode = new Pair<>(type, uuid);
    }

    @Nullable
    public byte[] getData() {
        return data;
    }

    @Nullable
    public Pair<String, UUID> getTransmissionMode() {
        return transmissionMode;
    }
}
