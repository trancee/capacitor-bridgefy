package com.getcapacitor.community.bridgefy;

import android.Manifest;
import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.os.Build;
import android.util.Base64;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import com.bridgefy.sdk.client.BFBleProfile;
import com.bridgefy.sdk.client.BFEnergyProfile;
import com.bridgefy.sdk.client.BFEngineProfile;
import com.bridgefy.sdk.client.BridgefyClient;
import com.bridgefy.sdk.client.BridgefyUtils;
import com.bridgefy.sdk.client.Config;
import com.bridgefy.sdk.client.Device;
import com.bridgefy.sdk.client.Message;
import com.bridgefy.sdk.client.MessageListener;
import com.bridgefy.sdk.client.RegistrationListener;
import com.bridgefy.sdk.client.Session;
import com.bridgefy.sdk.client.StateListener;
import com.bridgefy.sdk.framework.exceptions.MessageException;

import java.util.HashMap;

interface Constants {
    String API_KEY_MISSING = "Bridgefy API key missing";
}

@NativePlugin(
        requestCodes = {
                Bridgefy.REQUEST_PERMISSIONS,
        },

        permissions = {
                Manifest.permission.INTERNET,

                // Allows applications to connect to paired bluetooth devices.
                Manifest.permission.BLUETOOTH,
                // Allows applications to discover and pair bluetooth devices.
                Manifest.permission.BLUETOOTH_ADMIN,

                // Allows an app to access precise location.
                Manifest.permission.ACCESS_FINE_LOCATION,
        }
)
public class Bridgefy extends Plugin {
    protected static final int REQUEST_PERMISSIONS = 6969;

    @PluginMethod
    public void initialize(PluginCall call) {
        try {
            String apiKey = call.getString("apiKey");
//            if (apiKey == null) {
//                call.reject(Constants.API_KEY_MISSING);
//                return;
//            }

            if (hasRequiredPermissions()) {
                if (BridgefyUtils.isThingsDevice(getContext())) {
                    BluetoothAdapter bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
                    bluetoothAdapter.enable();
                }

                Boolean debug = call.getBoolean("debug");
                if (debug != null) {
                    com.bridgefy.sdk.client.Bridgefy.debug = debug;
                }

                com.bridgefy.sdk.client.Bridgefy.initialize(getContext(), apiKey, registrationListener);
            } else {
                saveCall(call);

                pluginRequestAllPermissions();
            }

            call.success();
        } catch (Exception e) {
            call.error(e.getLocalizedMessage(), e);
        }
    }

    @Override
    protected void handleOnDestroy() {
        super.handleOnDestroy();

        com.bridgefy.sdk.client.Bridgefy.stop();
    }

    @Override
    protected void handleRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.handleRequestPermissionsResult(requestCode, permissions, grantResults);

        PluginCall call = getSavedCall();
        if (call != null) {
            freeSavedCall();

            initialize(call);
        }
    }

    @PluginMethod
    public void start(PluginCall call) {
        try {
            Config config = null;

            Config.Builder builder = new Config.Builder();

            JSObject configObject = call.getObject("config", null);
            if (configObject != null) {
                Integer maxConnectionRetries = configObject.getInteger("maxConnectionRetries");
                if (maxConnectionRetries != null) {
                    builder.setMaxConnectionRetries(maxConnectionRetries);
                }

                String antennaType = configObject.getString("antennaType");
                if (antennaType != null) {
                    builder.setAntennaType(getAntenna(antennaType));
                }

                if (configObject.has("autoConnect")) {
                    builder.setAutoConnect(configObject.optBoolean("autoConnect"));
                }
                if (configObject.has("encryption")) {
                    builder.setEncryption(configObject.optBoolean("encryption"));
                }

                String energyProfile = configObject.getString("energyProfile");
                if (energyProfile != null) {
                    builder.setEnergyProfile(getEnergyProfile(energyProfile));
                }

                String bleProfile = configObject.getString("bleProfile");
                if (bleProfile != null) {
                    builder.setBleProfile(getBleProfile(bleProfile));
                }

                String engineProfile = configObject.getString("engineProfile");
                if (engineProfile != null) {
                    builder.setEngineProfile(getEngineProfile(engineProfile));
                }
            }

            config = builder.build();

            com.bridgefy.sdk.client.Bridgefy.start(messageListener, stateListener, config);

            call.success();
        } catch (Exception e) {
            call.error(e.getLocalizedMessage(), e);
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        try {
            if (com.bridgefy.sdk.client.Bridgefy.stop()) {
                call.success();
            } else {
                call.unavailable();
            }
        } catch (Exception e) {
            call.error(e.getLocalizedMessage(), e);
        }
    }

    @PluginMethod
    public void pause(PluginCall call) {
        try {
            if (com.bridgefy.sdk.client.Bridgefy.pause()) {
                call.success();
            } else {
                call.unavailable();
            }
        } catch (Exception e) {
            call.error(e.getLocalizedMessage(), e);
        }
    }

    @PluginMethod
    public void resume(PluginCall call) {
        try {
            if (com.bridgefy.sdk.client.Bridgefy.resume()) {
                call.success();
            } else {
                call.unavailable();
            }
        } catch (Exception e) {
            call.error(e.getLocalizedMessage(), e);
        }
    }

    @SuppressLint("NewApi")
    @PluginMethod
    public void sendBroadcastMessage(PluginCall call) {
        try {
            Message message = null;
            BFEngineProfile profile = null;

            JSObject messageObject = call.getObject("message", null);
            if (messageObject != null) {
                Message.Builder builder = new Message.Builder();

                JSObject contentObject = messageObject.getJSObject("content", null);
                if (contentObject != null) {
                    HashMap<String, Object> content = new HashMap<>();

                    contentObject.keys().forEachRemaining((key) -> content.put(key, contentObject.opt(key)));

                    builder.setContent(content);
                }

                String data = messageObject.getString("data");
                if (data != null) {
                    builder.setData(Base64.decode(data, Base64.DEFAULT));
                }

                message = builder.build();
            }

            String profileObject = call.getString("profile", null);
            if (profileObject != null) {
                profile = getEngineProfile(profileObject);
            }

            String uuid = com.bridgefy.sdk.client.Bridgefy.sendBroadcastMessage(message, profile);

            JSObject data = new JSObject();
            data.put("uuid", uuid);

            call.success(data);
        } catch (Exception e) {
            call.error(e.getLocalizedMessage(), e);
        }
    }

    @SuppressLint("NewApi")
    @PluginMethod
    public void sendMessage(PluginCall call) {
        try {
            Message message = null;
            BFEngineProfile profile = null;

            JSObject messageObject = call.getObject("message", null);
            if (messageObject != null) {
                Message.Builder builder = new Message.Builder();

                JSObject contentObject = messageObject.getJSObject("content", null);
                if (contentObject != null) {
                    HashMap<String, Object> content = new HashMap<>();

                    contentObject.keys().forEachRemaining((key) -> content.put(key, contentObject.opt(key)));

                    builder.setContent(content);
                }

                String data = messageObject.getString("data");
                if (data != null) {
                    builder.setData(Base64.decode(data, Base64.DEFAULT));
                }

                String receiverId = messageObject.getString("receiverId");
                if (receiverId != null) {
                    builder.setReceiverId(receiverId);
                }

                message = builder.build();
            }

            String profileObject = call.getString("profile", null);
            if (profileObject != null) {
                profile = getEngineProfile(profileObject);
            }

            String uuid = com.bridgefy.sdk.client.Bridgefy.sendMessage(message, profile);

            JSObject data = new JSObject();
            data.put("uuid", uuid);

            call.success(data);
        } catch (Exception e) {
            call.error(e.getLocalizedMessage(), e);
        }
    }

    RegistrationListener registrationListener = new RegistrationListener() {
        @Override
        public void onRegistrationSuccessful(BridgefyClient bridgefyClient) {
            Log.i(getLogTag(),
                    String.format("onRegistrationSuccessful"));

            notifyListeners("onRegistrationSuccessful", null);
        }


        @Override
        public void onRegistrationFailed(int errorCode, String message) {
            Log.e(getLogTag(),
                    String.format(
                            "onRegistrationFailed(errorCode=%s, message=%s)",
                            errorCode, message));

            JSObject data = new JSObject();
            data.put("message", message);
            data.put("errorCode", errorCode);

            notifyListeners("onRegistrationFailed", data);
        }
    };

    StateListener stateListener = new StateListener() {
        @Override
        public void onStarted() {
            super.onStarted();

            Log.i(getLogTag(),
                    String.format("onStarted"));

            notifyListeners("onStarted", null);
        }

        @Override
        public void onStartError(String message, int errorCode) {
            super.onStartError(message, errorCode);

            Log.e(getLogTag(),
                    String.format(
                            "onStartError(message=%s, errorCode=%d)",
                            message, errorCode));

            JSObject data = new JSObject();
            data.put("message", message);
            data.put("errorCode", errorCode);

            notifyListeners("onStartError", data);
        }

        @Override
        public void onStopped() {
            super.onStopped();

            Log.i(getLogTag(),
                    String.format("onStopped"));

            notifyListeners("onStopped", null);
        }

        @Override
        public void onDeviceConnected(Device device, Session session) {
            Log.i(getLogTag(),
                    String.format(
                            "onDeviceConnected(device=%s, session=%s)",
                            device, session));

            JSObject deviceObject = new JSObject();
            deviceObject.put("name", device.getDeviceName());
            deviceObject.put("address", device.getDeviceAddress());

            deviceObject.put("antennaType", device.getAntennaType().name());

            deviceObject.put("userId", device.getUserId());
            deviceObject.put("sessionId", device.getSessionId());

//            deviceObject.put("crc", device.getCrc());

            JSObject sessionObject = new JSObject();
//            sessionObject.put("publicKey", session.getPublicKey());
            sessionObject.put("antennaType", session.getAntennaType().name());
            sessionObject.put("userId", session.getUserId());
//            sessionObject.put("crc", session.getCrc());

            JSObject data = new JSObject();
            data.put("device", deviceObject);
            data.put("session", sessionObject);

            notifyListeners("onDeviceConnected", data);
        }

        @Override
        public void onDeviceLost(Device device) {
            Log.i(getLogTag(),
                    String.format(
                            "onDeviceLost(device=%s)",
                            device));

            JSObject deviceObject = new JSObject();
            deviceObject.put("name", device.getDeviceName());
            deviceObject.put("address", device.getDeviceAddress());

            deviceObject.put("antennaType", device.getAntennaType().name());

            deviceObject.put("userId", device.getUserId());
            deviceObject.put("sessionId", device.getSessionId());

//            deviceObject.put("crc", device.getCrc());

            JSObject data = new JSObject();
            data.put("device", deviceObject);

            notifyListeners("onDeviceLost", data);
        }

        @Override
        public void onDeviceBlackListed(Device device) {
            Log.i(getLogTag(),
                    String.format(
                            "onDeviceBlackListed(device=%s)",
                            device));

            JSObject deviceObject = new JSObject();
            deviceObject.put("name", device.getDeviceName());
            deviceObject.put("address", device.getDeviceAddress());

            deviceObject.put("antennaType", device.getAntennaType().name());

            deviceObject.put("userId", device.getUserId());
            deviceObject.put("sessionId", device.getSessionId());

//            deviceObject.put("crc", device.getCrc());

            JSObject data = new JSObject();
            data.put("device", deviceObject);

            notifyListeners("onDeviceBlackListed", data);
        }

        @Override
        public void onDeviceDetected(Device device) {
            Log.i(getLogTag(),
                    String.format(
                            "onDeviceDetected(device=%s)",
                            device));

            JSObject deviceObject = new JSObject();
            deviceObject.put("name", device.getDeviceName());
            deviceObject.put("address", device.getDeviceAddress());

            deviceObject.put("antennaType", device.getAntennaType().name());

            deviceObject.put("userId", device.getUserId());
            deviceObject.put("sessionId", device.getSessionId());

//            deviceObject.put("crc", device.getCrc());

            JSObject data = new JSObject();
            data.put("device", deviceObject);

            notifyListeners("onDeviceDetected", data);
        }

        @Override
        public void onDeviceUnavailable(Device device) {
            Log.i(getLogTag(),
                    String.format(
                            "onDeviceUnavailable(device=%s)",
                            device));

            JSObject deviceObject = new JSObject();
            deviceObject.put("name", device.getDeviceName());
            deviceObject.put("address", device.getDeviceAddress());

            deviceObject.put("antennaType", device.getAntennaType().name());

            deviceObject.put("userId", device.getUserId());
            deviceObject.put("sessionId", device.getSessionId());

//            deviceObject.put("crc", device.getCrc());

            JSObject data = new JSObject();
            data.put("device", deviceObject);

            notifyListeners("onDeviceUnavailable", data);
        }
    };

    MessageListener messageListener = new MessageListener() {
        @SuppressLint("NewApi")
        @Override
        public void onMessageReceived(Message message) {
            Log.i(getLogTag(),
                    String.format(
                            "onMessageReceived(message=%s)",
                            message));

            JSObject messageObject = new JSObject();
            messageObject.put("uuid", message.getUuid());

            {
                HashMap<String, Object> content = message.getContent();
                if (content != null) {
                    JSObject contentObject = new JSObject();

                    content.forEach((key, value) -> contentObject.put(key, value));

                    messageObject.put("content", contentObject);
                }
            }

            {
                byte[] data = message.getData();
                if (data != null) {
                    messageObject.put("data", Base64.encodeToString(data, Base64.DEFAULT | Base64.NO_WRAP));
                }
            }

            messageObject.put("receiverId", message.getReceiverId());
            messageObject.put("senderId", message.getSenderId());

            messageObject.put("dateSent", message.getDateSent());

            messageObject.put("hops", message.getHops());

            messageObject.put("isMesh", message.isMesh());

            JSObject data = new JSObject();
            data.put("message", messageObject);

            notifyListeners("onMessageReceived", data);
        }

        @Override
        public void onMessageSent(String messageId) {
            Log.i(getLogTag(),
                    String.format(
                            "onMessageSent(messageId=%s)",
                            messageId));

            JSObject data = new JSObject();
            data.put("messageId", messageId);

            notifyListeners("onMessageSent", data);
        }

        @Override
        public void onMessageReceivedException(String sender, MessageException e) {
            Log.e(getLogTag(),
                    String.format(
                            "onMessageReceivedException(sender=%s, e=%d)",
                            sender, e));

            JSObject data = new JSObject();
            data.put("sender", sender);
            data.put("exception", e);

            notifyListeners("onMessageReceivedException", data);
        }

        @Override
        public void onMessageFailed(Message message, MessageException e) {
            Log.e(getLogTag(),
                    String.format(
                            "onMessageFailed(message=%s, e=%d)",
                            message, e));

            JSObject data = new JSObject();
            data.put("message", message);
            data.put("exception", e);

            notifyListeners("onMessageFailed", data);
        }

        @SuppressLint("NewApi")
        @Override
        public void onBroadcastMessageReceived(Message message) {
            Log.i(getLogTag(),
                    String.format(
                            "onBroadcastMessageReceived(message=%s)",
                            message));

            JSObject messageObject = new JSObject();
            messageObject.put("uuid", message.getUuid());

            {
                HashMap<String, Object> content = message.getContent();
                if (content != null) {
                    JSObject contentObject = new JSObject();

                    content.forEach((key, value) -> contentObject.put(key, value));

                    messageObject.put("content", contentObject);
                }
            }

            {
                byte[] data = message.getData();
                if (data != null) {
                    messageObject.put("data", Base64.encodeToString(data, Base64.DEFAULT | Base64.NO_WRAP));
                }
            }

            messageObject.put("receiverId", message.getReceiverId());
            messageObject.put("senderId", message.getSenderId());

            messageObject.put("dateSent", message.getDateSent());

            messageObject.put("hops", message.getHops());

            messageObject.put("isMesh", message.isMesh());

            JSObject data = new JSObject();
            data.put("message", messageObject);

            notifyListeners("onBroadcastMessageReceived", data);
        }
    };

    private static Config.Antenna getAntenna(String antennaType) {
        switch (antennaType) {
            case "BLUETOOTH":
                return Config.Antenna.BLUETOOTH;
            case "BLUETOOTH_LE":
                return Config.Antenna.BLUETOOTH_LE;
            case "UNREACHABLE":
            default:
                return Config.Antenna.UNREACHABLE;
        }
    }

    private static BFEnergyProfile getEnergyProfile(String energyProfile) {
        switch (energyProfile) {
            case "ENERGY_SAVER":
                return BFEnergyProfile.ENERGY_SAVER;
            case "BALANCED":
                return BFEnergyProfile.BALANCED;
            case "HIGH_PERFORMANCE":
            default:
                return BFEnergyProfile.HIGH_PERFORMANCE;
        }
    }

    private static BFBleProfile getBleProfile(String bleProfile) {
        switch (bleProfile) {
            case "EXTENDED_RANGE":
                return BFBleProfile.EXTENDED_RANGE;
            case "DOUBLE_RATE":
                return BFBleProfile.DOUBLE_RATE;
            case "BACKWARDS_COMPATIBLE":
            default:
                return BFBleProfile.BACKWARDS_COMPATIBLE;
        }
    }

    private static BFEngineProfile getEngineProfile(String engineProfile) {
        switch (engineProfile) {
            case "DEFAULT":
            default:
                return BFEngineProfile.BFConfigProfileDefault;
            case "HIGH_DENSITY_NETWORK":
                return BFEngineProfile.BFConfigProfileHighDensityNetwork;
            case "SPARSE_NETWORK":
                return BFEngineProfile.BFConfigProfileSparseNetwork;
            case "LONG_REACH":
                return BFEngineProfile.BFConfigProfileLongReach;
            case "SHORT_REACH":
                return BFEngineProfile.BFConfigProfileShortReach;
            case "NO_FORWARDING":
                return BFEngineProfile.BFConfigProfileNoFowarding;
        }
    }
}
