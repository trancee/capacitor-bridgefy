package com.getcapacitor.community

import android.util.Log
import android.util.Pair
import me.bridgefy.Bridgefy
import me.bridgefy.commons.TransmissionMode
import me.bridgefy.commons.exception.BridgefyException
import me.bridgefy.commons.listener.BridgefyDelegate
import me.bridgefy.commons.propagation.PropagationProfile
import me.bridgefy.logger.enums.LogType
import java.util.Date
import java.util.UUID

class BridgefyController(private var plugin: BridgefyPlugin) {

    private var bridgefy: Bridgefy = Bridgefy(plugin.context)

    /**
     * Initialize
     */

    fun initialize(
        apiKey: UUID,
        verboseLogging: Boolean?,
    ) {
        bridgefy.init(
            apiKey,
            object : BridgefyDelegate {
                // Initialization Listeners

                override fun onStarted(userID: UUID) {
                    plugin.onStartedEvent(userID)
                }

                override fun onFailToStart(error: BridgefyException) {
                    plugin.onFailToStartEvent(fromBridgefyException(error))
                }

                override fun onStopped() {
                    plugin.onStoppedEvent();
                }

                override fun onFailToStop(error: BridgefyException) {
                    plugin.onFailToStopEvent(fromBridgefyException(error))
                }

                override fun onDestroySession() {
                    plugin.onDestroySessionEvent()
                }

                override fun onFailToDestroySession(error: BridgefyException) {
                    plugin.onFailToDestroySessionEvent(fromBridgefyException(error))
                }

                // Connectivity Listeners

                override fun onConnected(peerID: UUID) {
                    plugin.onConnectedEvent(peerID);
                }

                override fun onDisconnected(peerID: UUID) {
                    plugin.onDisconnectedEvent(peerID);
                }

                override fun onConnectedPeers(connectedPeers: List<UUID>) {
                    plugin.onConnectedPeersEvent(connectedPeers);
                }

                override fun onEstablishSecureConnection(userId: UUID) {
                    plugin.onEstablishSecureConnectionEvent(userId);
                }

                override fun onFailToEstablishSecureConnection(
                    userId: UUID,
                    error: BridgefyException
                ) {
                    plugin.onFailToEstablishSecureConnectionEvent(
                        userId,
                        fromBridgefyException(error)
                    )
                }

                // Transmission Listeners

                override fun onSend(messageID: UUID) {
                    plugin.onSendEvent(messageID);
                }

                override fun onFailToSend(
                    messageID: UUID,
                    error: BridgefyException
                ) {
                    plugin.onFailToSendEvent(messageID, fromBridgefyException(error))
                }

                override fun onProgressOfSend(
                    messageID: UUID,
                    position: Int,
                    of: Int
                ) {
                    plugin.onProgressOfSendEvent(messageID, position, of);
                }

                override fun onReceiveData(
                    data: ByteArray,
                    messageID: UUID,
                    transmissionMode: TransmissionMode
                ) {
                    plugin.onReceiveDataEvent(
                        messageID,
                        data,
                        fromTransmissionMode(transmissionMode)
                    );
                }
            },
            if (verboseLogging == null)
                LogType.None else
                LogType.ConsoleLogger(
                    if (verboseLogging)
                        Log.DEBUG else
                        Log.WARN
                ),
        )
    }

    fun isInitialized(): Boolean {
        return bridgefy.isInitialized
    }

    fun start(
        userID: UUID?,
        propagationProfile: String?,
    ) {
        bridgefy.start(
            userID,
            toPropagationProfile(propagationProfile) ?: PropagationProfile.Standard,
        )
    }

    fun isStarted(): Boolean {
        return bridgefy.isStarted
    }

    fun stop() {
        bridgefy.stop()
    }

    /**
     * License
     */

    fun licenseExpirationDate(): Date? {
        return bridgefy.licenseExpirationDate().getOrNull()
    }

    fun updateLicense() {
        bridgefy.updateLicense()
    }

    /**
     * Session
     */

    fun destroySession() {
        bridgefy.destroySession()
    }

    fun currentUserId(): UUID? {
        return bridgefy.currentUserId().getOrNull()
    }

    fun connectedPeers(): List<UUID> {
        val peers = bridgefy.connectedPeers().getOrNull()
        return peers ?: emptyList()
    }

    /**
     * Secure Connection
     */

    fun establishSecureConnection(
        userID: UUID,
    ) {
        bridgefy.establishSecureConnection(
            userID,
        )
    }

    fun fingerprint(
        userID: UUID,
    ): ByteArray? {
        val result = bridgefy.fingerprint(
            userID,
        ).getOrNull()
        return result?.scannable
    }

    fun isFingerprintValid(
        userID: UUID,
        fingerprint: ByteArray,
    ): Boolean {
        val result = bridgefy.isFingerprintValid(
            fingerprint,
            userID,
        ).getOrNull()
        return result ?: false
    }

    /**
     * Payload
     */

    fun send(
        data: ByteArray,
        transmissionMode: Pair<String, UUID>,
    ): UUID {
        val transmissionMode = toTransmissionMode(transmissionMode)
        if (transmissionMode == null) {
            throw Exception("missing transmission mode")
        }

        return bridgefy.send(
            data,
            transmissionMode,
        )
    }

    /**
     * Helpers
     */

    private fun toPropagationProfile(propagationProfile: String?): PropagationProfile? {
        return when (propagationProfile) {
            "highDensityNetwork" -> PropagationProfile.HighDensityEnvironment
            "sparseNetwork" -> PropagationProfile.SparseEnvironment
            "longReach" -> PropagationProfile.LongReach
            "shortReach" -> PropagationProfile.ShortReach
            "standard" -> PropagationProfile.Standard
            else -> null
        }
    }

    private fun toTransmissionMode(transmissionMode: Pair<String, UUID>): TransmissionMode? {
        return when (transmissionMode.first) {
            "broadcast" -> TransmissionMode.Broadcast(transmissionMode.second)
            "mesh" -> TransmissionMode.Mesh(transmissionMode.second)
            "p2p" -> TransmissionMode.P2P(transmissionMode.second)
            else -> null
        }
    }

    fun fromTransmissionMode(transmissionMode: TransmissionMode): Pair<String, UUID>? {
        return when (transmissionMode) {
            is TransmissionMode.Broadcast -> Pair("broadcast", transmissionMode.sender)
            is TransmissionMode.Mesh -> Pair("mesh", transmissionMode.receiver)
            is TransmissionMode.P2P -> Pair("p2p", transmissionMode.receiver)
            else -> null
        }
    }

    object ErrorType {
        const val ALREADY_STARTED: String = "alreadyStarted"
        const val DEVICE_CAPABILITIES: String = "deviceCapabilities"
        const val EXPIRED_LICENSE: String = "expiredLicense"
        const val GENERIC: String = "generic"
        const val INCONSISTENT_DEVICE_TIME: String = "inconsistentDeviceTime"
        const val INTERNET_CONNECTION_REQUIRED: String = "internetConnectionRequired"
        const val INVALID_API_KEY_FORMAT: String = "invalidAPIKeyFormat"
        const val MISSING_APPLICATION_ID: String = "missingApplicationID"
        const val PERMISSION: String = "permission"
        const val REGISTRATION: String = "registration"
        const val SESSION_ERROR: String = "sessionError"
        const val SIMULATOR_IS_NOT_SUPPORTED: String = "simulatorIsNotSupported"
        const val SIZE_LIMIT_EXCEEDED: String = "sizeLimitExceeded"
        const val UNKNOWN: String = "unknown"
    }

    @JvmRecord
    data class Error(val type: String, val message: String?, val code: Int? = null)

    fun fromBridgefyException(bridgefyException: BridgefyException): Error? {
        return when (bridgefyException) {
            is BridgefyException.AlreadyStartedException -> Error(
                ErrorType.ALREADY_STARTED,
                bridgefyException.message,
            )

            is BridgefyException.DeviceCapabilitiesException -> Error(
                ErrorType.DEVICE_CAPABILITIES,
                bridgefyException.message,
            )

            is BridgefyException.ExpiredLicenseException -> Error(
                ErrorType.EXPIRED_LICENSE,
                bridgefyException.message,
            )

            is BridgefyException.GenericException -> Error(
                ErrorType.GENERIC,
                bridgefyException.message,
                bridgefyException.code,
            )

            is BridgefyException.InconsistentDeviceTimeException -> Error(
                ErrorType.INCONSISTENT_DEVICE_TIME,
                bridgefyException.message,
            )

            is BridgefyException.InternetConnectionRequiredException -> Error(
                ErrorType.INTERNET_CONNECTION_REQUIRED,
                bridgefyException.message,
            )

            is BridgefyException.InvalidAPIKeyFormatException -> Error(
                ErrorType.INVALID_API_KEY_FORMAT,
                bridgefyException.message,
            )

            is BridgefyException.MissingApplicationIdException -> Error(
                ErrorType.MISSING_APPLICATION_ID,
                bridgefyException.message,
            )

            is BridgefyException.PermissionException -> Error(
                ErrorType.PERMISSION,
                bridgefyException.message,
            )

            is BridgefyException.RegistrationException -> Error(
                ErrorType.REGISTRATION,
                bridgefyException.message,
            )

            is BridgefyException.SessionErrorException -> Error(
                ErrorType.SESSION_ERROR,
                bridgefyException.message,
            )

            is BridgefyException.SimulatorIsNotSupportedException -> Error(
                ErrorType.SIMULATOR_IS_NOT_SUPPORTED,
                bridgefyException.message,
            )

            is BridgefyException.SizeLimitExceededException -> Error(
                ErrorType.SIZE_LIMIT_EXCEEDED,
                bridgefyException.message,
            )

            is BridgefyException.UnknownException -> Error(
                ErrorType.UNKNOWN,
                bridgefyException.message,
            )

            else -> null
        }
    }
}
