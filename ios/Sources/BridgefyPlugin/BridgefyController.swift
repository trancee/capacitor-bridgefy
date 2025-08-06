import Foundation
import BridgefySDK

@objc public class BridgefyController: NSObject {
    private var plugin: BridgefyPlugin
    private var bridgefy: BridgefySDK.Bridgefy?

    let errorAlreadyStarted: String = "alreadyStarted"
    let errorExpiredLicense: String = "expiredLicense"
    let errorInconsistentDeviceTime: String = "inconsistentDeviceTime"
    let errorInternetConnectionRequired: String = "internetConnectionRequired"
    let errorInvalidAPIKey: String = "invalidAPIKey"
    let errorMissingBundleID: String = "missingBundleID"
    let errorSessionError: String = "sessionError"
    let errorSimulatorIsNotSupported: String = "simulatorIsNotSupported"

    // iOS
    let errorInconsistentUserID: String = "inconsistentUserID"
    let errorNotStarted: String = "notStarted"
    let errorAlreadyInstantiated: String = "alreadyInstantiated"
    let errorStartInProgress: String = "startInProgress"
    let errorStopInProgress: String = "stopInProgress"
    let errorDestroySessionInProgress: String = "destroySessionInProgress"
    let errorServiceNotStarted: String = "serviceNotStarted"
    let errorBLEUsageNotGranted: String = "BLEUsageNotGranted"
    let errorBLEUsageRestricted: String = "BLEUsageRestricted"
    let errorBLEPoweredOff: String = "BLEPoweredOff"
    let errorBLEUnsupported: String = "BLEUnsupported"
    let errorBLEUnknownError: String = "BLEUnknownError"
    let errorInconsistentConnection: String = "inconsistentConnection"
    let errorConnectionIsAlreadySecure: String = "connectionIsAlreadySecure"
    let errorCannotCreateSecureConnection: String = "cannotCreateSecureConnection"
    let errorDataLengthExceeded: String = "dataLengthExceeded"
    let errorDataValueIsEmpty: String = "dataValueIsEmpty"
    let errorPeerIsNotConnected: String = "peerIsNotConnected"
    let errorInternalError: String = "internalError"

    let errorLicenseError: String = "licenseError"
    let errorStorageError: String = "storageError"
    let errorEncodingError: String = "encodingError"
    let errorEncryptionError: String = "encryptionError"

    private let notInitialized = NSError(domain: "Bridgefy", code: -1, userInfo: [NSLocalizedDescriptionKey: "Bridgefy SDK is not initialized"])

    init(_ plugin: BridgefyPlugin) {
        self.plugin = plugin
    }

    /**
     * Initialize
     */

    public func initialize(_ apiKey: UUID, _ verboseLogging: Bool? = false) throws {
        bridgefy = try BridgefySDK.Bridgefy(withApiKey: apiKey.uuidString.lowercased(),
                                            delegate: self,
                                            verboseLogging: verboseLogging ?? false)
    }

    public func isInitialized() -> Bool { return BridgefySDK.Bridgefy.isInitialized }

    public func start(_ userID: UUID?, _ propagationProfile: String?) throws {
        guard let bridgefy else {
            throw notInitialized
        }

        try bridgefy.start(withUserId: userID, andPropagationProfile: toPropagationProfile(propagationProfile) ?? .standard)
    }

    public func isStarted() -> Bool { return BridgefySDK.Bridgefy.isStarted }

    public func stop() throws {
        guard let bridgefy else {
            throw notInitialized
        }

        try bridgefy.stop()
    }

    /**
     * License
     */

    public func licenseExpirationDate() throws -> Date? {
        guard let bridgefy else {
            throw notInitialized
        }

        return try bridgefy.licenseExpirationDate
    }

    /**
     * Session
     */

    public func destroySession() throws {
        guard let bridgefy else {
            throw notInitialized
        }

        try bridgefy.destroySession()
    }

    public func currentUserID() throws -> UUID? {
        guard let bridgefy else {
            throw notInitialized
        }

        return try bridgefy.currentUserId
    }

    public func connectedPeers() throws -> [UUID]? {
        guard let bridgefy else {
            throw notInitialized
        }

        return try bridgefy.connectedPeers
    }

    /**
     * Secure Connection
     */

    public func establishSecureConnection(_ userID: UUID) throws {
        guard let bridgefy else {
            throw notInitialized
        }

        try bridgefy.establishSecureConnection(with: userID)
    }

    public func fingerprint(_ userID: UUID) throws -> BridgefySDK.BridgefyFingerprint? {
        guard let bridgefy else {
            throw notInitialized
        }

        return try bridgefy.fingerprint(for: userID)
    }

    public func isFingerprintValid(_ userID: UUID, _ fingerprint: Data) throws -> Bool {
        guard let bridgefy else {
            throw notInitialized
        }

        return try bridgefy.isFingerprintValid(fingerprint, for: userID)
    }

    /**
     * Payload
     */

    public func send(_ data: Data, _ transmissionMode: (String, UUID)?) throws -> UUID {
        guard let bridgefy else {
            throw notInitialized
        }

        guard let transmissionMode = toTransmissionMode(transmissionMode) else {
            throw CustomError.transmissionModeMissing
        }

        return try bridgefy.send(data, using: transmissionMode)
    }

    /**
     * Helpers
     */

    private func toPropagationProfile(_ propagationProfile: String?) -> BridgefySDK.PropagationProfile? {
        if let propagationProfile = propagationProfile {
            switch propagationProfile {
            case "highDensityNetwork": return .highDensityNetwork
            case "sparseNetwork": return .sparseNetwork
            case "longReach": return .longReach
            case "shortReach": return .shortReach
            case "standard": return .standard
            default: return nil
            }
        }
        return nil
    }

    private func fromTransmissionMode(_ transmissionMode: TransmissionMode) -> (String, UUID)? {
        switch transmissionMode {
        /// Propagate a message readable by every device that receives it.
        case .broadcast(senderId: let senderId): return ("broadcast", senderId)
        /// Deliver a message to a specific recipient using nearby devices to propagate it.
        case .mesh(userId: let userId): return ("mesh", userId)
        /// Deliver a message to a specific recipient only if there's an active connection with it.
        case .p2p(userId: let userId): return ("p2p", userId)
        @unknown default: return nil
        }
    }

    private func toTransmissionMode(_ transmissionMode: (String, UUID)?) -> BridgefySDK.TransmissionMode? {
        if let transmissionMode = transmissionMode {
            let uuid = transmissionMode.1
            switch transmissionMode.0 {
            case "broadcast": return .broadcast(senderId: uuid)
            case "mesh": return .mesh(userId: uuid)
            case "p2p": return .p2p(userId: uuid)
            default: return nil
            }
        }
        return nil
    }
}

extension BridgefyController: BridgefySDK.BridgefyDelegate {
    // Initialization Listeners

    /// This function is called when the BridgefySDK has been started.
    /// - Parameter userId: The current user id
    public func bridgefyDidStart(with userId: UUID) {
        plugin.onStartedEvent(userId)
    }

    public func bridgefyDidFailToStart(with error: BridgefySDK.BridgefyError) {
        plugin.onFailToStartEvent(fromBridgefyError(error))
    }

    public func bridgefyDidStop() {
        plugin.onStoppedEvent()
    }

    public func bridgefyDidFailToStop(with error: BridgefySDK.BridgefyError) {
        plugin.onFailToStopEvent(fromBridgefyError(error))
    }

    public func bridgefyDidDestroySession() {
        plugin.onDestroySessionEvent()
    }

    public func bridgefyDidFailToDestroySession(with error: BridgefySDK.BridgefyError) {
        plugin.onFailToDestroySessionEvent(fromBridgefyError(error))
    }

    // Connectivity Listeners

    public func bridgefyDidConnect(with userId: UUID) {
        plugin.onConnectedEvent(userId)
    }

    public func bridgefyDidDisconnect(from userId: UUID) {
        plugin.onDisconnectedEvent(userId)
    }

    public func bridgefyDidEstablishSecureConnection(with userId: UUID) {
        plugin.onEstablishSecureConnectionEvent(userId)
    }

    public func bridgefyDidFailToEstablishSecureConnection(with userId: UUID, error: BridgefySDK.BridgefyError) {
        plugin.onFailToEstablishSecureConnectionEvent(userId, fromBridgefyError(error))
    }

    public func bridgefyDidSendMessage(with messageId: UUID) {
        plugin.onSendEvent(messageId)
    }

    public func bridgefyDidFailSendingMessage(with messageId: UUID, withError error: BridgefySDK.BridgefyError) {
        plugin.onFailToSendEvent(messageId, fromBridgefyError(error))
    }

    public func bridgefyDidReceiveData(_ data: Data, with messageId: UUID, using transmissionMode: BridgefySDK.TransmissionMode) {
        plugin.onReceiveEvent(messageId, data, fromTransmissionMode(transmissionMode))
    }

    // swiftlint:disable:next cyclomatic_complexity
    func fromBridgefyError(_ error: BridgefySDK.BridgefyError) -> BridgefyError? {
        switch error {

        /// The Bridgefy SDK is already running
        case .alreadyStarted: return BridgefyError(errorAlreadyStarted, message: error.localizedDescription)

        /// The license is expired
        case .expiredLicense: return BridgefyError(errorExpiredLicense, message: error.localizedDescription)

        /// The device's time has been modified
        case .inconsistentDeviceTime: return BridgefyError(errorInconsistentDeviceTime, message: error.localizedDescription)

        /// An internet connection is required to validate the license
        case .internetConnectionRequired: return BridgefyError(errorInternetConnectionRequired, message: error.localizedDescription)

        /// The provided API key is invalid
        case .invalidApiKey: return BridgefyError(errorInvalidAPIKey, message: error.localizedDescription)

        /// Cannot get app's bundle id
        case .missingBundleID: return BridgefyError(errorMissingBundleID, message: error.localizedDescription)

        /// An error occurred while creating the session
        case .sessionError: return BridgefyError(errorSessionError, message: error.localizedDescription)

        /// The Bridgefy SDK cannot run in the simulator
        case .simulatorIsNotSupported: return BridgefyError(errorSimulatorIsNotSupported, message: error.localizedDescription)

        // iOS

        /// The userId passed in the start function is different from the stored one.
        case .inconsistentUserId: return BridgefyError(errorInconsistentUserID, message: error.localizedDescription)

        /// The Bridgefy SDK hasn't been started
        case .notStarted: return BridgefyError(errorNotStarted, message: error.localizedDescription)

        /// A Bridgefy SDK instance already exists
        case .alreadyInstantiated: return BridgefyError(errorAlreadyInstantiated, message: error.localizedDescription)

        /// The Bridgefy SDK is performing the start process
        case .startInProgress: return BridgefyError(errorStartInProgress, message: error.localizedDescription)

        /// The Bridgefy SDK is performing the stop process
        case .stopInProgress: return BridgefyError(errorStopInProgress, message: error.localizedDescription)

        /// The Bridgefy SDK is destroying the current session
        case .destroySessionInProgress: return BridgefyError(errorDestroySessionInProgress, message: error.localizedDescription)

        /// The Bridgefy SDK service is not started
        case .serviceNotStarted: return BridgefyError(errorServiceNotStarted, message: error.localizedDescription)

        /// The user does not allow the use of BLE
        case .BLEUsageNotGranted: return BridgefyError(errorBLEUsageNotGranted, message: error.localizedDescription)

        /// The use of BLE in this device is restricted
        case .BLEUsageRestricted: return BridgefyError(errorBLEUsageRestricted, message: error.localizedDescription)

        /// The BLE antenna has been turned off
        case .BLEPoweredOff: return BridgefyError(errorBLEPoweredOff, message: error.localizedDescription)

        /// The usage of BLE is not supported in the device
        case .BLEUnsupported: return BridgefyError(errorBLEUnsupported, message: error.localizedDescription)

        /// BLE usage failed with an unknown error
        case .BLEUnknownError: return BridgefyError(errorBLEUnknownError, message: error.localizedDescription)

        case .inconsistentConnection: return BridgefyError(errorInconsistentConnection, message: error.localizedDescription)

        case .connectionIsAlreadySecure: return BridgefyError(errorConnectionIsAlreadySecure, message: error.localizedDescription)

        case .cannotCreateSecureConnection: return BridgefyError(errorCannotCreateSecureConnection, message: error.localizedDescription)

        /// The length of the data exceed the maximum limit
        case .dataLengthExceeded: return BridgefyError(errorDataLengthExceeded, message: error.localizedDescription)

        /// The data to send is empty
        case .dataValueIsEmpty: return BridgefyError(errorDataValueIsEmpty, message: error.localizedDescription)

        /// The requested peer is not connected
        case .peerIsNotConnected: return BridgefyError(errorPeerIsNotConnected, message: error.localizedDescription)

        /// An internal error occurred
        case .internalError: return BridgefyError(errorInternalError, message: error.localizedDescription)

        /// An error occurred while validating the license
        case .licenseError(code: let code): return BridgefyError(errorLicenseError, message: error.localizedDescription, code: code)

        /// An error occurred while storing data
        case .storageError(code: let code): return BridgefyError(errorStorageError, message: error.localizedDescription, code: code)

        /// An error occurred while encoding the message
        case .encodingError(code: let code): return BridgefyError(errorEncodingError, message: error.localizedDescription, code: code)

        /// An error occurred while encrypting the message
        case .encryptionError(code: let code): return BridgefyError(errorEncryptionError, message: error.localizedDescription, code: code)

        @unknown default: return nil
        }
    }
}
