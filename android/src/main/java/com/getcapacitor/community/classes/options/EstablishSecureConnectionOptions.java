package com.getcapacitor.community.classes.options;

import androidx.annotation.Nullable;

import com.getcapacitor.PluginCall;

import java.util.UUID;

public class EstablishSecureConnectionOptions {

    @Nullable
    private UUID userID;

    public EstablishSecureConnectionOptions(PluginCall call) {
        @Nullable
        String userID = call.getString("userID");
        this.setUserID(userID);
    }

    private void setUserID(@Nullable String userID) {
        try {
            this.userID = UUID.fromString(userID);
        } catch (Exception ignored) {
            this.userID = null;
        }
    }

    @Nullable
    public UUID getUserID() {
        return userID;
    }
}
