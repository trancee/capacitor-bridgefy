package com.getcapacitor.community;

import java.util.UUID;
import javax.annotation.Nullable;
import me.bridgefy.commons.TransmissionMode;
import me.bridgefy.commons.exception.BridgefyException;
import me.bridgefy.commons.propagation.PropagationProfile;

public class BridgefyHelper {

    @Nullable
    static Boolean makeBoolean(@Nullable String value) {
        if (value == null || value.isEmpty()) return null;
        return Boolean.parseBoolean(value);
    }

    static String getBridgefyExceptionType(BridgefyException exception) {
        if (exception == null) return ExceptionType.UNKNOWN;
        else if (exception instanceof BridgefyException.AlreadyStartedException) return ExceptionType.ALREADY_STARTED;
        else if (exception instanceof BridgefyException.DeviceCapabilitiesException) return ExceptionType.DEVICE_CAPABILITIES;
        else if (exception instanceof BridgefyException.ExpiredLicenseException) return ExceptionType.EXPIRED_LICENSE;
        else if (exception instanceof BridgefyException.GenericException) return ExceptionType.GENERIC;
        else if (exception instanceof BridgefyException.InconsistentDeviceTimeException) return ExceptionType.INCONSISTENT_DEVICE_TIME;
        else if (
            exception instanceof BridgefyException.InternetConnectionRequiredException
        ) return ExceptionType.INTERNET_CONNECTION_REQUIRED;
        else if (exception instanceof BridgefyException.InvalidAPIKeyFormatException) return ExceptionType.INVALID_API_KEY_FORMAT;
        else if (exception instanceof BridgefyException.MissingApplicationIdException) return ExceptionType.MISSING_APPLICATION_ID;
        else if (exception instanceof BridgefyException.PermissionException) return ExceptionType.PERMISSION;
        else if (exception instanceof BridgefyException.RegistrationException) return ExceptionType.REGISTRATION;
        else if (exception instanceof BridgefyException.SessionErrorException) return ExceptionType.SESSION_ERROR;
        else if (exception instanceof BridgefyException.SimulatorIsNotSupportedException) return ExceptionType.SIMULATOR_IS_NOT_SUPPORTED;
        else if (exception instanceof BridgefyException.SizeLimitExceededException) return ExceptionType.SIZE_LIMIT_EXCEEDED;
        else if (exception instanceof BridgefyException.UnknownException) return ExceptionType.UNKNOWN;
        return ExceptionType.UNKNOWN;
    }

    static class ExceptionType {

        static final String ALREADY_STARTED = "alreadyStarted";
        static final String DEVICE_CAPABILITIES = "deviceCapabilities";
        static final String EXPIRED_LICENSE = "expiredLicense";
        static final String GENERIC = "generic";
        static final String INCONSISTENT_DEVICE_TIME = "inconsistentDeviceTime";
        static final String INTERNET_CONNECTION_REQUIRED = "internetConnectionRequired";
        static final String INVALID_API_KEY_FORMAT = "invalidAPIKeyFormat";
        static final String MISSING_APPLICATION_ID = "missingApplicationID";
        static final String PERMISSION = "permission";
        static final String REGISTRATION = "registration";
        static final String SESSION_ERROR = "sessionError";
        static final String SIMULATOR_IS_NOT_SUPPORTED = "simulatorIsNotSupported";
        static final String SIZE_LIMIT_EXCEEDED = "sizeLimitExceeded";
        static final String UNKNOWN = "unknown";
    }

    static String getPropagationProfile(me.bridgefy.commons.propagation.PropagationProfile propagationProfile) {
        return switch (propagationProfile) {
            case Standard -> PropagationProfile.STANDARD;
            case HighDensityEnvironment -> PropagationProfile.HIGH_DENSITY_ENVIRONMENT;
            case SparseEnvironment -> PropagationProfile.SPARSE_ENVIRONMENT;
            case LongReach -> PropagationProfile.LONG_REACH;
            case ShortReach -> PropagationProfile.SHORT_REACH;
        };
    }

    public static me.bridgefy.commons.propagation.PropagationProfile toPropagationProfile(String propagationProfile) {
        return switch (propagationProfile) {
            case PropagationProfile.STANDARD -> me.bridgefy.commons.propagation.PropagationProfile.Standard;
            case PropagationProfile.HIGH_DENSITY_ENVIRONMENT -> me.bridgefy.commons.propagation.PropagationProfile.HighDensityEnvironment;
            case PropagationProfile.SPARSE_ENVIRONMENT -> me.bridgefy.commons.propagation.PropagationProfile.SparseEnvironment;
            case PropagationProfile.LONG_REACH -> me.bridgefy.commons.propagation.PropagationProfile.LongReach;
            case PropagationProfile.SHORT_REACH -> me.bridgefy.commons.propagation.PropagationProfile.ShortReach;
            default -> me.bridgefy.commons.propagation.PropagationProfile.Standard;
        };
    }

    static class PropagationProfile {

        static final String STANDARD = "standard";
        static final String HIGH_DENSITY_ENVIRONMENT = "highDensityEnvironment";
        static final String SPARSE_ENVIRONMENT = "sparseEnvironment";
        static final String LONG_REACH = "longReach";
        static final String SHORT_REACH = "shortReach";
    }

    public record TransmissionMode(String type, UUID uuid) {}

    public static me.bridgefy.commons.TransmissionMode toTransmissionMode(String type, UUID uuid) {
        return switch (type) {
            case TransmissionType.BROADCAST -> new me.bridgefy.commons.TransmissionMode.Broadcast(uuid);
            case TransmissionType.MESH -> new me.bridgefy.commons.TransmissionMode.Mesh(uuid);
            case TransmissionType.P2P -> new me.bridgefy.commons.TransmissionMode.P2P(uuid);
            default -> null;
        };
    }

    static TransmissionMode getTransmissionMode(me.bridgefy.commons.TransmissionMode transmissionMode) {
        if (transmissionMode == null) return null;
        else if (transmissionMode instanceof me.bridgefy.commons.TransmissionMode.Broadcast broadcast) {
            return new TransmissionMode(TransmissionType.BROADCAST, broadcast.getSender());
        } else if (transmissionMode instanceof me.bridgefy.commons.TransmissionMode.Mesh mesh) {
            return new TransmissionMode(TransmissionType.MESH, mesh.getReceiver());
        } else if (transmissionMode instanceof me.bridgefy.commons.TransmissionMode.P2P p2p) {
            return new TransmissionMode(TransmissionType.P2P, p2p.getReceiver());
        }
        return null;
    }

    static class TransmissionType {

        static final String BROADCAST = "broadcast";
        static final String MESH = "mesh";
        static final String P2P = "p2p";
    }
}
