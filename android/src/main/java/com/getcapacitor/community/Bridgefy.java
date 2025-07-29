package com.getcapacitor.community;

import static com.getcapacitor.community.BridgefyHelper.TransmissionMode;
import static com.getcapacitor.community.BridgefyHelper.getBridgefyExceptionType;
import static com.getcapacitor.community.BridgefyHelper.getTransmissionMode;

import android.content.Context;
import android.util.Log;

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

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import me.bridgefy.commons.exception.BridgefyException;
import me.bridgefy.commons.listener.BridgefyDelegate;
import me.bridgefy.commons.propagation.PropagationProfile;
import me.bridgefy.logger.enums.LogType;

public class Bridgefy {

    private final String NOT_IMPLEMENTED = "not implemented";
    private final String MISSING_API_KEY = "missing API key";
    private final String MISSING_USER_IDENTIFIER = "missing user identifier";
    private final String MISSING_FINGERPRINT = "missing fingerprint";
    private final String MISSING_PAYLOAD = "missing payload";
    private final String MISSING_TRANSMISSION_MODE = "missing transmission mode";

    @NonNull
    private final BridgefyPlugin plugin;

    @NonNull
    private final BridgefyConfig config;

    private final me.bridgefy.Bridgefy bridgefy;

    public Bridgefy(@NonNull BridgefyConfig config, @NonNull BridgefyPlugin plugin) {
        this.config = config;
        this.plugin = plugin;

        Context context = plugin.getContext();

        bridgefy = new me.bridgefy.Bridgefy(context);
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

        LogType logging = (verboseLogging == null)
                ? new LogType.None()
                : new LogType.ConsoleLogger((verboseLogging) ? Log.DEBUG : Log.WARN);

        bridgefy.init(apiKey, delegate, logging);

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

        @NonNull
        PropagationProfile propagationProfile = options.getPropagationProfile();

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
        Date licenseExpirationDate = new Date(); // bridgefy.licenseExpirationDate();

        LicenseExpirationDateResult result = new LicenseExpirationDateResult(licenseExpirationDate);
        callback.success(result);

        // callback.error(new Exception(NOT_IMPLEMENTED));
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
        UUID userID = new UUID(0, 0); // bridgefy.currentUserId();

        UserIDResult result = new UserIDResult(userID);
        callback.success(result);

        // callback.error(new Exception(NOT_IMPLEMENTED));
    }

    public void connectedPeers(@NonNull Callback callback) {
        List<UUID> peers = new ArrayList<>(); // bridgefy.connectedPeers();

        ConnectedPeersResult result = new ConnectedPeersResult(peers);
        callback.success(result);

        // callback.error(new Exception(NOT_IMPLEMENTED));
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

        var fingerprint = new byte[]{}; // bridgefy.fingerprint(userID);

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

        var isValid = false; // bridgefy.isFingerprintValid(fingerprint, userID);

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

    /**
     * Delegate
     */

    BridgefyDelegate delegate = new BridgefyDelegate() {
        // Initialization Listeners

        @Override
        public void onStarted(UUID userID) {
            plugin.onStartedEvent(userID);
        }

        @Override
        public void onFailToStart(BridgefyException exception) {
            String type = getBridgefyExceptionType(exception);

            plugin.onFailToStartEvent(type, exception);
        }

        @Override
        public void onStopped() {
            plugin.onStoppedEvent();
        }

        @Override
        public void onFailToStop(BridgefyException exception) {
            String type = getBridgefyExceptionType(exception);

            plugin.onFailToStopEvent(type, exception);
        }

        @Override
        public void onDestroySession() {
            plugin.onDestroySessionEvent();
        }

        @Override
        public void onFailToDestroySession(BridgefyException exception) {
            String type = getBridgefyExceptionType(exception);

            plugin.onFailToDestroySessionEvent(type, exception);
        }

        // Connectivity Listeners

        @Override
        public void onConnected(UUID peerID) {
            plugin.onConnectedEvent(peerID);
        }

        @Override
        public void onDisconnected(UUID peerID) {
            plugin.onDisconnectedEvent(peerID);
        }

        @Override
        public void onConnectedPeers(List<UUID> peerIDs) {
            plugin.onConnectedPeersEvent(peerIDs);
        }

        @Override
        public void onEstablishSecureConnection(UUID userID) {
            plugin.onEstablishSecureConnectionEvent(userID);
        }

        @Override
        public void onFailToEstablishSecureConnection(UUID userID, BridgefyException exception) {
            String type = getBridgefyExceptionType(exception);

            plugin.onFailToEstablishSecureConnectionEvent(userID, type, exception);
        }

        // Transmission Listeners

        @Override
        public void onSend(UUID messageID) {
            plugin.onSendEvent(messageID);
        }

        @Override
        public void onFailToSend(UUID messageID, BridgefyException exception) {
            String type = getBridgefyExceptionType(exception);

            plugin.onFailToSendEvent(messageID, type, exception);
        }

        @Override
        public void onProgressOfSend(UUID messageID, int position, int total) {
            plugin.onProgressOfSendEvent(messageID, position, total);
        }

        @Override
        public void onReceiveData(byte[] bytes, UUID messageID, me.bridgefy.commons.TransmissionMode bridgefyTransmissionMode) {
            TransmissionMode transmissionMode = getTransmissionMode(bridgefyTransmissionMode);

            plugin.onReceiveDataEvent(messageID, bytes, transmissionMode);
        }
    };
}
