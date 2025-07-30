package com.getcapacitor.community;

import static com.getcapacitor.community.BridgefyHelper.makeUUID;

import java.util.UUID;
import javax.annotation.Nullable;

public class BridgefyConfig {

    @Nullable
    UUID apiKey;

    @Nullable
    Boolean verboseLogging;

    public BridgefyConfig(@Nullable String apiKey, @Nullable Boolean verboseLogging) {
        this.setAPIKey(apiKey);
        this.setVerboseLogging(verboseLogging);
    }

    public void setAPIKey(@Nullable String apiKey) {
        this.apiKey = makeUUID(apiKey);
    }

    public void setVerboseLogging(@Nullable Boolean verboseLogging) {
        this.verboseLogging = verboseLogging;
    }

    @Nullable
    public UUID getAPIKey() {
        return apiKey;
    }

    @Nullable
    public Boolean getVerboseLogging() {
        return verboseLogging;
    }
}
