package com.getcapacitor.community

import android.content.Context
import android.util.Log
import me.bridgefy.Bridgefy
import me.bridgefy.commons.TransmissionMode
import me.bridgefy.commons.listener.BridgefyDelegate
import me.bridgefy.commons.propagation.PropagationProfile
import me.bridgefy.logger.enums.LogType
import java.util.Date
import java.util.UUID

class BridgefyController(context: Context) {

    private var bridgefy: Bridgefy = Bridgefy(context)

    /**
     * Initialize
     */

    fun initialize(
        apiKey: UUID,
        verboseLogging: Boolean?,
        delegate: BridgefyDelegate?,
    ) {
        bridgefy.init(
            apiKey,
            delegate,
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
        propagationProfile: PropagationProfile,
    ) {
        bridgefy.start(
            userID,
            propagationProfile,
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
        transmissionMode: TransmissionMode,
    ): UUID {
        return bridgefy.send(
            data,
            transmissionMode,
        )
    }
}
