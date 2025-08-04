package com.getcapacitor.community;

import static com.getcapacitor.community.BridgefyHelper.makeUUID;

import java.util.UUID;
import javax.annotation.Nullable;

public class BridgefyConfig {

    @Nullable
    UUID userID;

    @Nullable
    UUID apiKey;

    @Nullable
    Boolean verboseLogging;

    @Nullable
    String propagationProfile;

    public BridgefyConfig(
        @Nullable UUID userID,
        @Nullable String apiKey,
        @Nullable Boolean verboseLogging,
        @Nullable String propagationProfile
    ) {
        this.userID = userID;

        this.setAPIKey(apiKey);
        this.setVerboseLogging(verboseLogging);
        this.setPropagationProfile(propagationProfile);
    }

    public void setAPIKey(@Nullable String apiKey) {
        this.apiKey = makeUUID(apiKey);
    }

    public void setVerboseLogging(@Nullable Boolean verboseLogging) {
        this.verboseLogging = verboseLogging;
    }

    public void setPropagationProfile(@Nullable String propagationProfile) {
        this.propagationProfile = propagationProfile;
    }

    @Nullable
    public UUID getAPIKey() {
        return apiKey;
    }

    @Nullable
    public Boolean getVerboseLogging() {
        return verboseLogging;
    }

    @Nullable
    public String getPropagationProfile() {
        return propagationProfile;
    }

    @Nullable
    public UUID getUserID() {
        return userID;
    }
}
