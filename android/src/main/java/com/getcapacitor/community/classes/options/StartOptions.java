package com.getcapacitor.community.classes.options;

import static com.getcapacitor.community.BridgefyHelper.toPropagationProfile;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.getcapacitor.PluginCall;
import java.util.UUID;
import me.bridgefy.commons.propagation.PropagationProfile;

public class StartOptions {

    @Nullable
    private UUID userID;

    @NonNull
    private PropagationProfile propagationProfile = PropagationProfile.Standard;

    public StartOptions(PluginCall call) {
        @Nullable
        String userID = call.getString("userID");
        this.setUserID(userID);

        @Nullable
        String propagationProfile = call.getString("propagationProfile");
        if (propagationProfile != null && !propagationProfile.isEmpty()) {
            this.setPropagationProfile(propagationProfile);
        }
    }

    private void setUserID(@Nullable String userID) {
        try {
            this.userID = UUID.fromString(userID);
        } catch (Exception ignored) {
            this.userID = null;
        }
    }

    private void setPropagationProfile(@NonNull String propagationProfile) {
        this.propagationProfile = toPropagationProfile(propagationProfile);
    }

    @Nullable
    public UUID getUserID() {
        return userID;
    }

    @NonNull
    public PropagationProfile getPropagationProfile() {
        return propagationProfile;
    }
}
