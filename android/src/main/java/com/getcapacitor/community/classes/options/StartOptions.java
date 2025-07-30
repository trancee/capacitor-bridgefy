package com.getcapacitor.community.classes.options;

import static com.getcapacitor.community.BridgefyHelper.makeUUID;

import androidx.annotation.Nullable;
import com.getcapacitor.PluginCall;
import java.util.UUID;

public class StartOptions {

    @Nullable
    private UUID userID;

    @Nullable
    private String propagationProfile;

    public StartOptions(PluginCall call) {
        @Nullable
        String userID = call.getString("userID");
        this.setUserID(userID);

        @Nullable
        String propagationProfile = call.getString("propagationProfile");
        this.setPropagationProfile(propagationProfile);
    }

    private void setUserID(@Nullable String userID) {
        this.userID = makeUUID(userID);
    }

    private void setPropagationProfile(@Nullable String propagationProfile) {
        this.propagationProfile = propagationProfile;
    }

    @Nullable
    public UUID getUserID() {
        return userID;
    }

    @Nullable
    public String getPropagationProfile() {
        return propagationProfile;
    }
}
