package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import java.util.UUID;

public class DisconnectedEvent extends PeerIDEvent {

    public DisconnectedEvent(@NonNull UUID peerID) {
        super(peerID);
    }
}
