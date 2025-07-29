package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import java.util.List;
import java.util.UUID;

public class ConnectedPeersEvent {

    @NonNull
    List<UUID> peerIDs;

    public ConnectedPeersEvent(@NonNull List<UUID> peerIDs) {
        this.peerIDs = peerIDs;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        JSArray peerIDs = new JSArray();

        for (UUID peerID : this.peerIDs) {
            peerIDs.put(peerID);
        }

        result.put("peerIDs", peerIDs);

        return result;
    }
}
