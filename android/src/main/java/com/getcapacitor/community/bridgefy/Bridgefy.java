package com.getcapacitor.community.bridgefy;

import android.Manifest;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import com.bridgefy.sdk.client.BridgefyClient;
import com.bridgefy.sdk.client.Device;
import com.bridgefy.sdk.client.Message;
import com.bridgefy.sdk.client.MessageListener;
import com.bridgefy.sdk.client.RegistrationListener;
import com.bridgefy.sdk.client.Session;
import com.bridgefy.sdk.client.StateListener;
import com.bridgefy.sdk.framework.exceptions.MessageException;

@NativePlugin(
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

    @PluginMethod
    public void initialize(PluginCall call) {
        String apiKey = call.getString("apiKey");

        com.bridgefy.sdk.client.Bridgefy.initialize(getContext(), apiKey, new RegistrationListener() {
            @Override
            public void onRegistrationSuccessful(BridgefyClient bridgefyClient) {
                call.success();

                // Bridgefy is ready to start
                com.bridgefy.sdk.client.Bridgefy.start(messageListener, stateListener);
            }

            @Override
            public void onRegistrationFailed(int errorCode, String message) {
                // Something went wrong: handle error code, maybe print the message
                call.error(message);
            }
        });
    }

    StateListener stateListener = new StateListener() {
        @Override
        public void onDeviceConnected(Device device, Session session) {
            Log.i(getLogTag(),
                    String.format(
                            "onDeviceConnected(device=%s, session=%s)",
                            device, session));

//            sendMessage(device);

            JSObject data = new JSObject();
            data.put("device", device);
            data.put("session", session);

            notifyListeners("onDeviceConnected", data);
        }

        @Override
        public void onDeviceLost(Device device) {
            Log.i(getLogTag(),
                    String.format(
                            "onDeviceLost(device=%s)",
                            device));

            JSObject data = new JSObject();
            data.put("device", device);

            notifyListeners("onDeviceLost", data);
        }

        @Override
        public void onDeviceDetected(Device device) {
            JSObject data = new JSObject();
            data.put("device", device);

            notifyListeners("onDeviceDetected", data);
        }

        @Override
        public void onDeviceUnavailable(Device device) {
            JSObject data = new JSObject();
            data.put("device", device);

            notifyListeners("onDeviceUnavailable", data);
        }


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

            Log.i(getLogTag(),
                    String.format(
                            "onDeviceLost(message=%s, errorCode=%d)",
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
    };

    MessageListener messageListener = new MessageListener() {
        @Override
        public void onMessageReceived(Message message) {
            Log.i(getLogTag(),
                    String.format(
                            "onMessageReceived(message=%s)",
                            message));

//            devicesAdapter.addDevice(s);

            JSObject data = new JSObject();
            data.put("message", message);

            notifyListeners("onMessageReceived", data);
        }

        @Override
        public void onMessageFailed(Message message, MessageException e) {
//            Log.e(TAG, "Message failed", e);
        }

        @Override
        public void onMessageReceivedException(String s, MessageException e) {
//            Log.e(TAG, e.getMessage());
        }
    };
}
