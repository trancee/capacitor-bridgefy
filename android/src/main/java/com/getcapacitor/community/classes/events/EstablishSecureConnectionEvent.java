package com.getcapacitor.community.classes.events;

import androidx.annotation.NonNull;
import java.util.UUID;

public class EstablishSecureConnectionEvent extends UserIDEvent {

    public EstablishSecureConnectionEvent(@NonNull UUID userID) {
        super(userID);
    }
}
