package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import java.util.List;
import java.util.UUID;

public class ConnectedPeersEvent {

    @NonNull
    List<UUID> peers;

    public ConnectedPeersEvent(@NonNull List<UUID> peers) {
        this.peers = peers;
    }

    @NonNull
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        JSArray peers = new JSArray();

        for (UUID peer : this.peers) {
            peers.put(peer.toString());
        }

        result.put("peers", peers);

        return result;
    }
}
