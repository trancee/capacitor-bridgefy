package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import java.util.UUID;

public class ConnectedEvent extends PeerIDEvent {

    public ConnectedEvent(@NonNull UUID peerID) {
        super(peerID);
    }
}
