package com.getcapacitor.community;

import static com.getcapacitor.community.BridgefyHelper.makeBoolean;

import android.Manifest;
import android.os.Build;
import android.util.Pair;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import com.getcapacitor.community.BridgefyController.Reason;
import com.getcapacitor.community.classes.events.ConnectedEvent;
import com.getcapacitor.community.classes.events.ConnectedPeersEvent;
import com.getcapacitor.community.classes.events.DestroySessionEvent;
import com.getcapacitor.community.classes.events.DisconnectedEvent;
import com.getcapacitor.community.classes.events.EstablishSecureConnectionEvent;
import com.getcapacitor.community.classes.events.FailToDestroySessionEvent;
import com.getcapacitor.community.classes.events.FailToEstablishSecureConnectionEvent;
import com.getcapacitor.community.classes.events.FailToSendEvent;
import com.getcapacitor.community.classes.events.FailToStartEvent;
import com.getcapacitor.community.classes.events.FailToStopEvent;
import com.getcapacitor.community.classes.events.ProgressOfSendEvent;
import com.getcapacitor.community.classes.events.ReceiveDataEvent;
import com.getcapacitor.community.classes.events.SendEvent;
import com.getcapacitor.community.classes.events.StartedEvent;
import com.getcapacitor.community.classes.events.StoppedEvent;
import com.getcapacitor.community.classes.options.EstablishSecureConnectionOptions;
import com.getcapacitor.community.classes.options.FingerprintOptions;
import com.getcapacitor.community.classes.options.InitializeOptions;
import com.getcapacitor.community.classes.options.IsFingerprintValidOptions;
import com.getcapacitor.community.classes.options.SendOptions;
import com.getcapacitor.community.classes.options.StartOptions;
import com.getcapacitor.community.interfaces.Callback;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.json.JSONException;

@CapacitorPlugin(
    name = "Bridgefy",
    permissions = {
        @Permission(
            strings = {
                // Required to be able to connect to paired Bluetooth devices.
                Manifest.permission.BLUETOOTH_CONNECT,
                // Required to be able to advertise to nearby Bluetooth devices.
                Manifest.permission.BLUETOOTH_ADVERTISE,
                // Required to be able to discover and pair nearby Bluetooth devices.
                Manifest.permission.BLUETOOTH_SCAN
            },
            alias = "bluetoothNearby"
        ),
        @Permission(
            strings = {
                // Allows applications to connect to paired bluetooth devices.
                Manifest.permission.BLUETOOTH,
                // Allows applications to discover and pair bluetooth devices.
                Manifest.permission.BLUETOOTH_ADMIN
            },
            alias = "bluetoothLegacy"
        ),
        @Permission(
            strings = {
                // Allows an app to access approximate location.
                Manifest.permission.ACCESS_COARSE_LOCATION,
                // Allows an app to access precise location.
                Manifest.permission.ACCESS_FINE_LOCATION
            },
            alias = "location"
        ),
        @Permission(
            strings = {
                // Allows an app to access approximate location.
                Manifest.permission.ACCESS_COARSE_LOCATION
            },
            alias = "locationCoarse"
        )
    }
)
public class BridgefyPlugin extends Plugin {

    // Initialization Listeners

    static final String STARTED_EVENT = "onStarted";
    static final String FAIL_TO_START_EVENT = "onFailToStart";
    static final String STOPPED_EVENT = "onStopped";
    static final String FAIL_TO_STOP_EVENT = "onFailToStop";
    static final String DESTROY_SESSION_EVENT = "onDestroySession";
    static final String FAIL_TO_DESTROY_SESSION_EVENT = "onFailToDestroySession";

    // Connectivity Listeners

    static final String CONNECTED_EVENT = "onConnected";
    static final String DISCONNECTED_EVENT = "onDisconnected";
    static final String CONNECTED_PEERS_EVENT = "onConnectedPeers";
    static final String ESTABLISH_SECURE_CONNECTION_EVENT = "onEstablishSecureConnection";
    static final String FAIL_TO_ESTABLISH_SECURE_CONNECTION_EVENT = "onFailToEstablishSecureConnection";

    // Transmission Listeners

    static final String SEND_EVENT = "onSend";
    static final String FAIL_TO_SEND_EVENT = "onFailToSend";
    static final String PROGRESS_OF_SEND_EVENT = "onProgressOfSend";
    static final String RECEIVE_DATA_EVENT = "onReceiveData";

    private Bridgefy implementation;

    @Override
    public void load() {
        super.load();

        BridgefyConfig config = getBridgefyConfig();

        implementation = new Bridgefy(config, this);
    }

    /**
     * Initialize
     */

    @PluginMethod
    public void initialize(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            InitializeOptions options = new InitializeOptions(call);

            implementation.initialize(options, callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    @PluginMethod
    public void isInitialized(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            implementation.isInitialized(callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    @PluginMethod
    public void start(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            StartOptions options = new StartOptions(call);

            implementation.start(options, callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    @PluginMethod
    public void isStarted(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            implementation.isStarted(callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            implementation.stop(callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    /**
     * License
     */

    @PluginMethod
    public void licenseExpirationDate(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            implementation.licenseExpirationDate(callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    @PluginMethod
    public void updateLicense(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            implementation.updateLicense(callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    /**
     * Session
     */

    @PluginMethod
    public void destroySession(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            implementation.destroySession(callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    @PluginMethod
    public void currentUserID(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            implementation.currentUserID(callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    @PluginMethod
    public void connectedPeers(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            implementation.connectedPeers(callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    /**
     * Secure Connection
     */

    @PluginMethod
    public void establishSecureConnection(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            EstablishSecureConnectionOptions options = new EstablishSecureConnectionOptions(call);

            implementation.establishSecureConnection(options, callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    @PluginMethod
    public void fingerprint(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            FingerprintOptions options = new FingerprintOptions(call);

            implementation.fingerprint(options, callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    @PluginMethod
    public void isFingerprintValid(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            IsFingerprintValidOptions options = new IsFingerprintValidOptions(call);

            implementation.isFingerprintValid(options, callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    /**
     * Payload
     */

    @PluginMethod
    public void send(PluginCall call) {
        Callback callback = new Callback(call) {};

        try {
            SendOptions options = new SendOptions(call);

            implementation.send(options, callback);
        } catch (Exception exception) {
            callback.error(exception);
        }
    }

    /**
     * Permissions
     */

    @Override
    @PluginMethod
    public void checkPermissions(PluginCall call) {
        // super.checkPermissions(call);

        Map<String, PermissionState> permissionsResult = getPermissionStates();

        if (permissionsResult.isEmpty()) {
            call.resolve();
        } else {
            List<String> aliases = getAliases();

            JSObject result = new JSObject();

            for (Map.Entry<String, PermissionState> entry : permissionsResult.entrySet()) {
                if (aliases.contains(entry.getKey())) {
                    result.put(entry.getKey(), entry.getValue());
                }
            }

            call.resolve(result);
        }
    }

    private List<String> getAliases() {
        List<String> aliases = new ArrayList<>();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            aliases.add("bluetoothNearby");
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            aliases.add("bluetoothNearby");
            aliases.add("location");
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            aliases.add("bluetoothLegacy");
            aliases.add("location");
        } else {
            aliases.add("bluetoothLegacy");
            aliases.add("locationCoarse");
        }

        return aliases;
    }

    @Override
    @PluginMethod
    public void requestPermissions(PluginCall call) {
        List<String> aliases = getAliases();

        JSArray permissions = call.getArray("permissions");
        if (permissions != null) {
            try {
                List<String> permissionsList = permissions.toList();
                for (String permission : permissionsList) {
                    switch (permission) {
                        case "bluetooth":
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                                aliases.add("bluetoothNearby");
                            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                                aliases.add("bluetoothNearby");
                            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                                aliases.add("bluetoothLegacy");
                            } else {
                                aliases.add("bluetoothLegacy");
                            }
                            break;
                        case "location":
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                                aliases.add("location");
                            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                                aliases.add("location");
                            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                                aliases.add("location");
                            } else {
                                aliases.add("locationCoarse");
                            }
                            break;
                    }
                }
            } catch (JSONException ignored) {}
        }

        requestPermissionForAliases(aliases.toArray(new String[0]), call, "permissionsCallback");
    }

    @PermissionCallback
    private void permissionsCallback(PluginCall call) {
        this.checkPermissions(call);
    }

    /**
     * Configuration
     */

    private BridgefyConfig getBridgefyConfig() {
        @NonNull
        String apiKey = getConfig().getString("apiKey");

        @Nullable
        Boolean verboseLogging = makeBoolean(getConfig().getString("verboseLogging"));

        return new BridgefyConfig(apiKey, verboseLogging);
    }

    /**
     * Initialization Listeners
     */

    protected void onStartedEvent(UUID userID) {
        StartedEvent event = new StartedEvent(userID);

        notifyListeners(STARTED_EVENT, event.toJSObject());
    }

    protected void onFailToStartEvent(Reason reason) {
        FailToStartEvent event = new FailToStartEvent(reason);

        notifyListeners(FAIL_TO_START_EVENT, event.toJSObject());
    }

    protected void onStoppedEvent() {
        StoppedEvent event = new StoppedEvent();

        notifyListeners(STOPPED_EVENT, event.toJSObject());
    }

    protected void onFailToStopEvent(Reason reason) {
        FailToStopEvent event = new FailToStopEvent(reason);

        notifyListeners(FAIL_TO_STOP_EVENT, event.toJSObject());
    }

    protected void onDestroySessionEvent() {
        DestroySessionEvent event = new DestroySessionEvent();

        notifyListeners(DESTROY_SESSION_EVENT, event.toJSObject());
    }

    protected void onFailToDestroySessionEvent(Reason reason) {
        FailToDestroySessionEvent event = new FailToDestroySessionEvent(reason);

        notifyListeners(FAIL_TO_DESTROY_SESSION_EVENT, event.toJSObject());
    }

    /**
     * Connectivity Listeners
     */

    protected void onConnectedEvent(UUID peerID) {
        ConnectedEvent event = new ConnectedEvent(peerID);

        notifyListeners(CONNECTED_EVENT, event.toJSObject());
    }

    protected void onDisconnectedEvent(UUID peerID) {
        DisconnectedEvent event = new DisconnectedEvent(peerID);

        notifyListeners(DISCONNECTED_EVENT, event.toJSObject());
    }

    protected void onConnectedPeersEvent(List<UUID> connectedPeers) {
        ConnectedPeersEvent event = new ConnectedPeersEvent(connectedPeers);

        notifyListeners(CONNECTED_PEERS_EVENT, event.toJSObject());
    }

    protected void onEstablishSecureConnectionEvent(UUID userID) {
        EstablishSecureConnectionEvent event = new EstablishSecureConnectionEvent(userID);

        notifyListeners(ESTABLISH_SECURE_CONNECTION_EVENT, event.toJSObject());
    }

    protected void onFailToEstablishSecureConnectionEvent(UUID userID, Reason reason) {
        FailToEstablishSecureConnectionEvent event = new FailToEstablishSecureConnectionEvent(userID, reason);

        notifyListeners(FAIL_TO_ESTABLISH_SECURE_CONNECTION_EVENT, event.toJSObject());
    }

    /**
     * Transmission Listeners
     */

    protected void onSendEvent(UUID messageID) {
        SendEvent event = new SendEvent(messageID);

        notifyListeners(SEND_EVENT, event.toJSObject());
    }

    protected void onFailToSendEvent(UUID messageID, Reason reason) {
        FailToSendEvent event = new FailToSendEvent(messageID, reason);

        notifyListeners(FAIL_TO_SEND_EVENT, event.toJSObject());
    }

    protected void onProgressOfSendEvent(UUID messageID, int position, int total) {
        ProgressOfSendEvent event = new ProgressOfSendEvent(messageID, position, total);

        notifyListeners(PROGRESS_OF_SEND_EVENT, event.toJSObject());
    }

    protected void onReceiveDataEvent(UUID messageID, byte[] data, Pair<String, UUID> transmissionMode) {
        ReceiveDataEvent event = new ReceiveDataEvent(messageID, data, transmissionMode);

        notifyListeners(RECEIVE_DATA_EVENT, event.toJSObject());
    }
}
