package com.getcapacitor.community.classes.options;

import android.util.Base64;
import androidx.annotation.Nullable;
import com.getcapacitor.PluginCall;
import java.util.UUID;

public class IsFingerprintValidOptions {

    @Nullable
    private UUID userID;

    @Nullable
    private byte[] fingerprint;

    public IsFingerprintValidOptions(PluginCall call) {
        @Nullable
        String userID = call.getString("userID");
        this.setUserID(userID);

        @Nullable
        String fingerprint = call.getString("fingerprint");
        this.setFingerprint(fingerprint);
    }

    private void setUserID(@Nullable String userID) {
        try {
            this.userID = UUID.fromString(userID);
        } catch (Exception ignored) {
            this.userID = null;
        }
    }

    private void setFingerprint(@Nullable String fingerprint) {
        this.fingerprint = (fingerprint == null || fingerprint.isEmpty()) ? null : Base64.decode(fingerprint, Base64.NO_WRAP);
    }

    @Nullable
    public UUID getUserID() {
        return userID;
    }

    @Nullable
    public byte[] getFingerprint() {
        return fingerprint;
    }
}
