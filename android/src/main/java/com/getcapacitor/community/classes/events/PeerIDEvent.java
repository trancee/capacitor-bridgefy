package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSObject;
import java.util.UUID;

public class PeerIDEvent {

    @NonNull
    UUID peerID;

    public PeerIDEvent(@NonNull UUID peerID) {
        this.peerID = peerID;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        result.put("peerID", peerID.toString());

        return result;
    }
}
