package com.getcapacitor.community;

import android.content.Context;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.getcapacitor.community.classes.options.EstablishSecureConnectionOptions;
import com.getcapacitor.community.classes.options.FingerprintOptions;
import com.getcapacitor.community.classes.options.InitializeOptions;
import com.getcapacitor.community.classes.options.IsFingerprintValidOptions;
import com.getcapacitor.community.classes.options.SendOptions;
import com.getcapacitor.community.classes.options.StartOptions;
import com.getcapacitor.community.classes.results.ConnectedPeersResult;
import com.getcapacitor.community.classes.results.FingerprintResult;
import com.getcapacitor.community.classes.results.IsFingerprintValidResult;
import com.getcapacitor.community.classes.results.IsInitializedResult;
import com.getcapacitor.community.classes.results.IsStartedResult;
import com.getcapacitor.community.classes.results.LicenseExpirationDateResult;
import com.getcapacitor.community.classes.results.SendResult;
import com.getcapacitor.community.classes.results.UserIDResult;
import com.getcapacitor.community.interfaces.Callback;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Bridgefy {

    private final String MISSING_API_KEY = "missing API key";
    private final String MISSING_USER_IDENTIFIER = "missing user identifier";
    private final String MISSING_FINGERPRINT = "missing fingerprint";
    private final String MISSING_PAYLOAD = "missing payload";
    private final String MISSING_TRANSMISSION_MODE = "missing transmission mode";

    @NonNull
    private final BridgefyConfig config;

    private final BridgefyController bridgefy;

    public Bridgefy(@NonNull BridgefyConfig config, @NonNull BridgefyPlugin plugin) {
        this.config = config;

        bridgefy = new BridgefyController(plugin);
    }

    /**
     * Initialize
     */

    public void initialize(@NonNull InitializeOptions options, @NonNull Callback callback) {
        @Nullable
        UUID apiKey = options.getAPIKey() != null ? options.getAPIKey() : config.getAPIKey();

        if (apiKey == null) {
            callback.error(new Exception(MISSING_API_KEY));
            return;
        }

        @Nullable
        Boolean verboseLogging = options.getVerboseLogging() != null ? options.getVerboseLogging() : config.getVerboseLogging();

        bridgefy.initialize(apiKey, verboseLogging);

        callback.success();
    }

    public void isInitialized(@NonNull Callback callback) {
        Boolean isInitialized = bridgefy.isInitialized();

        IsInitializedResult result = new IsInitializedResult(isInitialized);
        callback.success(result);
    }

    public void start(@NonNull StartOptions options, @NonNull Callback callback) {
        @Nullable
        UUID userID = options.getUserID();

        @Nullable
        String propagationProfile = options.getPropagationProfile();

        bridgefy.start(userID, propagationProfile);

        callback.success();
    }

    public void isStarted(@NonNull Callback callback) {
        Boolean isStarted = bridgefy.isStarted();

        IsStartedResult result = new IsStartedResult(isStarted);
        callback.success(result);
    }

    public void stop(@NonNull Callback callback) {
        bridgefy.stop();

        callback.success();
    }

    /**
     * License
     */

    public void licenseExpirationDate(@NonNull Callback callback) {
        Date licenseExpirationDate = bridgefy.licenseExpirationDate();

        LicenseExpirationDateResult result = new LicenseExpirationDateResult(licenseExpirationDate);
        callback.success(result);
    }

    public void updateLicense(@NonNull Callback callback) {
        bridgefy.updateLicense();

        callback.success();
    }

    /**
     * Session
     */

    public void destroySession(@NonNull Callback callback) {
        bridgefy.destroySession();

        callback.success();
    }

    public void currentUserID(@NonNull Callback callback) {
        UUID userID = bridgefy.currentUserId();

        UserIDResult result = new UserIDResult(userID);
        callback.success(result);
    }

    public void connectedPeers(@NonNull Callback callback) {
        List<UUID> peers = bridgefy.connectedPeers();

        ConnectedPeersResult result = new ConnectedPeersResult(peers);
        callback.success(result);
    }

    /**
     * Secure Connection
     */

    public void establishSecureConnection(@NonNull EstablishSecureConnectionOptions options, @NonNull Callback callback) {
        @Nullable
        UUID userID = options.getUserID();

        if (userID == null) {
            callback.error(new Exception(MISSING_USER_IDENTIFIER));
            return;
        }

        bridgefy.establishSecureConnection(userID);

        callback.success();
    }

    public void fingerprint(@NonNull FingerprintOptions options, @NonNull Callback callback) {
        @Nullable
        UUID userID = options.getUserID();

        if (userID == null) {
            callback.error(new Exception(MISSING_USER_IDENTIFIER));
            return;
        }

        var fingerprint = bridgefy.fingerprint(userID);

        FingerprintResult result = new FingerprintResult(fingerprint);
        callback.success(result);
    }

    public void isFingerprintValid(@NonNull IsFingerprintValidOptions options, @NonNull Callback callback) {
        @Nullable
        UUID userID = options.getUserID();

        if (userID == null) {
            callback.error(new Exception(MISSING_USER_IDENTIFIER));
            return;
        }

        @Nullable
        byte[] fingerprint = options.getFingerprint();

        if (fingerprint == null) {
            callback.error(new Exception(MISSING_FINGERPRINT));
            return;
        }

        var isValid = bridgefy.isFingerprintValid(userID, fingerprint);

        IsFingerprintValidResult result = new IsFingerprintValidResult(isValid);
        callback.success(result);
    }

    /**
     * Payload
     */

    public void send(@NonNull SendOptions options, @NonNull Callback callback) {
        @Nullable
        byte[] data = options.getData();

        if (data == null) {
            callback.error(new Exception(MISSING_PAYLOAD));
            return;
        }

        @Nullable
        var transmissionMode = options.getTransmissionMode();

        if (transmissionMode == null) {
            callback.error(new Exception(MISSING_TRANSMISSION_MODE));
            return;
        }

        UUID messageID = bridgefy.send(data, transmissionMode);

        SendResult result = new SendResult(messageID);
        callback.success(result);
    }
}
