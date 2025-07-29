package com.getcapacitor.community.classes.results;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.community.interfaces.Result;
import java.util.List;
import java.util.UUID;

public class ConnectedPeersResult implements Result {

    private final List<UUID> peers;

    public ConnectedPeersResult(List<UUID> peers) {
        this.peers = peers;
    }

    @Override
    public JSObject toJSObject() {
        JSObject result = new JSObject();

        if (peers != null) {
            JSArray jsPeers = new JSArray();

            for (UUID peer : peers) {
                jsPeers.put(peer);
            }

            result.put("peers", jsPeers);
        }

        return result;
    }
}
