import Foundation
import BridgefySDK

@objc public class BridgefyController: NSObject {
    private var plugin: BridgefyPlugin
    private var bridgefy: BridgefySDK.Bridgefy!

    init(_ plugin: BridgefyPlugin) {
        self.plugin = plugin
    }

    /**
     * Initialize
     */

    public func initialize(_ apiKey: UUID, _ verboseLogging: Bool? = false) throws {
        bridgefy = try BridgefySDK.Bridgefy(withApiKey: apiKey.uuidString,
                                            delegate: self,
                                            verboseLogging: verboseLogging ?? false)
    }

    public func isInitialized() -> Bool { return BridgefySDK.Bridgefy.isInitialized }

    public func start(_ userID: UUID? = nil, _ propagationProfile: String?) throws {
        // FIXME: check if SDK is initialized
        try bridgefy.start(withUserId: userID, andPropagationProfile: toPropagationProfile(propagationProfile) ?? .standard)
    }

    public func isStarted() -> Bool { return BridgefySDK.Bridgefy.isStarted }

    public func stop() {
        bridgefy.stop()
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
        plugin.onReceiveDataEvent(messageId, data, fromTransmissionMode(transmissionMode))
    }

    func fromBridgefyError(_ error: BridgefySDK.BridgefyError) -> BridgefyError? {
        let ALREADY_STARTED: String = "alreadyStarted"
        let DEVICE_CAPABILITIES: String = "deviceCapabilities" // Android
        let EXPIRED_LICENSE: String = "expiredLicense"
        let GENERIC: String = "generic" // Android
        let INCONSISTENT_DEVICE_TIME: String = "inconsistentDeviceTime"
        let INTERNET_CONNECTION_REQUIRED: String = "internetConnectionRequired"
        let INVALID_API_KEY: String = "invalidAPIKey"
        let MISSING_APPLICATION_ID: String = "missingApplicationID" // Android
        let MISSING_BUNDLE_ID: String = "missingBundleID"
        let PERMISSION: String = "permission" // Android
        let REGISTRATION: String = "registration" // Android
        let SESSION_ERROR: String = "sessionError"
        let SIMULATOR_IS_NOT_SUPPORTED: String = "simulatorIsNotSupported"
        let SIZE_LIMIT_EXCEEDED: String = "sizeLimitExceeded" // Android
        let UNKNOWN: String = "unknown" // Android

        // iOS
        let INCONSISTENT_USER_ID: String = "inconsistentUserId"
        let NOT_STARTED: String = "notStarted"
        let ALREADY_INSTANTIATED: String = "alreadyInstantiated"
        let START_IN_PROGRESS: String = "startInProgress"
        let STOP_IN_PROGRESS: String = "stopInProgress"
        let DESTROY_SESSION_IN_PROGRESS: String = "destroySessionInProgress"
        let SERVICE_NOT_STARTED: String = "serviceNotStarted"
        let BLE_USAGE_NOT_GRANTED: String = "BLEUsageNotGranted"
        let BLE_USAGE_RESTRICTED: String = "BLEUsageRestricted"
        let BLE_POWERED_OFF: String = "BLEPoweredOff"
        let BLE_UNSUPPORTED: String = "BLEUnsupported"
        let BLE_UNKNOWN_ERROR: String = "BLEUnknownError"
        let INCONSISTENT_CONNECTION: String = "inconsistentConnection"
        let CONNECTION_IS_ALREADY_SECURE: String = "connectionIsAlreadySecure"
        let CANNOT_CREATE_SECURE_CONNECTION: String = "cannotCreateSecureConnection"
        let DATA_LENGTH_EXCEEDED: String = "dataLengthExceeded"
        let DATA_VALUE_IS_EMPTY: String = "dataValueIsEmpty"
        let PEER_IS_NOT_CONNECTED: String = "peerIsNotConnected"
        let INTERNAL_ERROR: String = "internalError"

        let LICENSE_ERROR: String = "licenseError"
        let STORAGE_ERROR: String = "storageError"
        let ENCODING_ERROR: String = "encodingError"
        let ENCRYPTION_ERROR: String = "encryptionError"

        switch error {

        /// The Bridgefy SDK is already running
        case .alreadyStarted: return BridgefyError(ALREADY_STARTED)

        /// The license is expired
        case .expiredLicense: return BridgefyError(EXPIRED_LICENSE)

        /// The device's time has been modified
        case .inconsistentDeviceTime: return BridgefyError(INCONSISTENT_DEVICE_TIME)

        /// An internet connection is required to validate the license
        case .internetConnectionRequired: return BridgefyError(INTERNET_CONNECTION_REQUIRED)

        /// The provided API key is invalid
        case .invalidApiKey: return BridgefyError(INVALID_API_KEY)

        /// Cannot get app's bundle id
        case .missingBundleID: return BridgefyError(MISSING_BUNDLE_ID)

        /// An error occurred while creating the session
        case .sessionError: return BridgefyError(SESSION_ERROR)

        /// The Bridgefy SDK cannot run in the simulator
        case .simulatorIsNotSupported: return BridgefyError(SIMULATOR_IS_NOT_SUPPORTED)

        // iOS

        /// The userId passed in the start function is different from the stored one.
        case .inconsistentUserId: return BridgefyError(INCONSISTENT_USER_ID)

        /// The Bridgefy SDK hasn't been started
        case .notStarted: return BridgefyError(NOT_STARTED)

        /// A Bridgefy SDK instance already exists
        case .alreadyInstantiated: return BridgefyError(ALREADY_INSTANTIATED)

        /// The Bridgefy SDK is performing the start process
        case .startInProgress: return BridgefyError(START_IN_PROGRESS)

        /// The Bridgefy SDK is performing the stop process
        case .stopInProgress: return BridgefyError(STOP_IN_PROGRESS)

        /// The Bridgefy SDK is destroying the current session
        case .destroySessionInProgress: return BridgefyError(DESTROY_SESSION_IN_PROGRESS)

        /// The Bridgefy SDK service is not started
        case .serviceNotStarted: return BridgefyError(SERVICE_NOT_STARTED)

        /// The user does not allow the use of BLE
        case .BLEUsageNotGranted: return BridgefyError(BLE_USAGE_NOT_GRANTED)

        /// The use of BLE in this device is restricted
        case .BLEUsageRestricted: return BridgefyError(BLE_USAGE_RESTRICTED)

        /// The BLE antenna has been turned off
        case .BLEPoweredOff: return BridgefyError(BLE_POWERED_OFF)

        /// The usage of BLE is not supported in the device
        case .BLEUnsupported: return BridgefyError(BLE_UNSUPPORTED)

        /// BLE usage failed with an unknown error
        case .BLEUnknownError: return BridgefyError(BLE_UNKNOWN_ERROR)

        case .inconsistentConnection: return BridgefyError(INCONSISTENT_CONNECTION)

        case .connectionIsAlreadySecure: return BridgefyError(CONNECTION_IS_ALREADY_SECURE)

        case .cannotCreateSecureConnection: return BridgefyError(CANNOT_CREATE_SECURE_CONNECTION)

        /// The length of the data exceed the maximum limit
        case .dataLengthExceeded: return BridgefyError(DATA_LENGTH_EXCEEDED)

        /// The data to send is empty
        case .dataValueIsEmpty: return BridgefyError(DATA_VALUE_IS_EMPTY)

        /// The requested peer is not connected
        case .peerIsNotConnected: return BridgefyError(PEER_IS_NOT_CONNECTED)

        /// An internal error occurred
        case .internalError: return BridgefyError(INTERNAL_ERROR)

        /// An error occurred while validating the license
        case .licenseError(code: let code): return BridgefyError(LICENSE_ERROR, code: code)

        /// An error occurred while storing data
        case .storageError(code: let code): return BridgefyError(STORAGE_ERROR, code: code)

        /// An error occurred while encoding the message
        case .encodingError(code: let code): return BridgefyError(ENCODING_ERROR, code: code)

        /// An error occurred while encrypting the message
        case .encryptionError(code: let code): return BridgefyError(ENCRYPTION_ERROR, code: code)
        }
    }
}
