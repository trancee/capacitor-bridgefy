package com.getcapacitor.community;

import android.content.Context;
import androidx.annotation.NonNull;
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
        try {
            this.apiKey = UUID.fromString(apiKey);
        } catch (Exception ignored) {
            this.apiKey = null;
        }
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
