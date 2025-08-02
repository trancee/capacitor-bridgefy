package com.getcapacitor.community.classes.options;

import static com.getcapacitor.community.BridgefyHelper.makeBoolean;
import static com.getcapacitor.community.BridgefyHelper.makeUUID;

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
        Boolean verboseLogging = call.getBoolean("verboseLogging");
        this.setVerboseLogging(verboseLogging);
    }

    private void setAPIKey(@Nullable String apiKey) {
        this.apiKey = makeUUID(apiKey);
    }

    private void setVerboseLogging(@Nullable Boolean verboseLogging) {
        this.verboseLogging = verboseLogging; // makeBoolean(verboseLogging);
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
