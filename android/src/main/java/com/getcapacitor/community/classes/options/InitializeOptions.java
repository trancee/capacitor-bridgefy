package com.getcapacitor.community.classes.options;

import androidx.annotation.Nullable;
import com.getcapacitor.PluginCall;
import java.util.UUID;

public class InitializeOptions {

    @Nullable
    private UUID apiKey;

    @Nullable
    private Boolean verboseLogging;

    public InitializeOptions(PluginCall call) {
        @Nullable
        String apiKey = call.getString("apiKey");
        this.setAPIKey(apiKey);

        @Nullable
        String verboseLogging = call.getString("verboseLogging");
        if (verboseLogging != null && !verboseLogging.isEmpty()) {
            this.setVerboseLogging(Boolean.parseBoolean(verboseLogging));
        }
    }

    private void setAPIKey(@Nullable String apiKey) {
        try {
            this.apiKey = UUID.fromString(apiKey);
        } catch (Exception ignored) {
            this.apiKey = null;
        }
    }

    private void setVerboseLogging(@Nullable Boolean verboseLogging) {
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
