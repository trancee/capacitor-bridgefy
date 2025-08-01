import Foundation
import Capacitor
import CoreBluetooth

@objc public class Bridgefy: NSObject {
    private let plugin: BridgefyPlugin
    private let config: BridgefyConfig?

    private let bridgefy: BridgefyController

    init(plugin: BridgefyPlugin, config: BridgefyConfig?) {
        self.plugin = plugin
        self.config = config

        self.bridgefy = BridgefyController(plugin)

        super.init()
    }

    deinit {
        stop {_ in}
    }

    /**
     * Initialize
     */

    @objc public func initialize(_ options: InitializeOptions, completion: @escaping (Error?) -> Void) {
        guard let apiKey = options.getAPIKey() ?? config?.getAPIKey() else {
            completion(CustomError.apiKeyMissing)
            return
        }

        let verboseLogging = options.getVerboseLogging() ?? config?.getVerboseLogging()

        do {
            try bridgefy.initialize(apiKey, verboseLogging)

            completion(nil)
        } catch {
            completion(error)
        }
    }

    @objc public func isInitialized(completion: @escaping (Result?, Error?) -> Void) {
        let isInitialized = bridgefy.isInitialized()

        let result = IsInitializedResult(isInitialized)

        completion(result, nil)
    }

    @objc public func start(_ options: StartOptions, completion: @escaping (Error?) -> Void) {
        let userID = options.getUserID()

        let propagationProfile = options.getPropagationProfile()

        do {
            try bridgefy.start(userID, propagationProfile)

            completion(nil)
        } catch {
            completion(error)
        }
    }

    @objc public func isStarted(completion: @escaping (Result?, Error?) -> Void) {
        let isStarted = bridgefy.isStarted()

        let result = IsStartedResult(isStarted)

        completion(result, nil)
    }

    @objc public func stop(completion: @escaping (Error?) -> Void) {
        do {
            try bridgefy.stop()

            completion(nil)
        } catch {
            completion(error)
        }
    }

    /**
     * License
     */

    @objc public func licenseExpirationDate(completion: @escaping (Result?, Error?) -> Void) {
        do {
            let licenseExpirationDate = try bridgefy.licenseExpirationDate()

            let result = LicenseExpirationDateResult(licenseExpirationDate)

            completion(result, nil)
        } catch {
            completion(nil, error)
        }
    }

    /**
     * Session
     */

    @objc public func destroySession(completion: @escaping (Error?) -> Void) {
        do {
            try bridgefy.destroySession()

            completion(nil)
        } catch {
            completion(error)
        }
    }

    @objc public func currentUserID(completion: @escaping (Result?, Error?) -> Void) {
        do {
            let currentUserID = try bridgefy.currentUserID()

            let result = CurrentUserIDResult(currentUserID)

            completion(result, nil)
        } catch {
            completion(nil, error)
        }
    }

    @objc public func connectedPeers(completion: @escaping (Result?, Error?) -> Void) {
        do {
            let peers = try bridgefy.connectedPeers()

            let result = ConnectedPeersResult(peers)

            completion(result, nil)
        } catch {
            completion(nil, error)
        }
    }

    /**
     * Secure Connection
     */

    @objc public func establishSecureConnection(_ options: EstablishSecureConnectionOptions, completion: @escaping (Error?) -> Void) {
        guard let userID = options.getUserID() else {
            completion(CustomError.userIDMissing)
            return
        }

        do {
            try bridgefy.establishSecureConnection(userID)

            completion(nil)
        } catch {
            completion(error)
        }
    }

    @objc public func fingerprint(_ options: FingerprintOptions, completion: @escaping (Result?, Error?) -> Void) {
        guard let userID = options.getUserID() else {
            completion(nil, CustomError.userIDMissing)
            return
        }

        do {
            let fingerprint = try bridgefy.fingerprint(userID)

            guard let fingerprint = fingerprint else {
                completion(nil, CustomError.fingerprintMissing)
                return
            }

            let result = FingerprintResult(fingerprint.scannable)

            completion(result, nil)
        } catch {
            completion(nil, error)
        }
    }

    @objc public func isFingerprintValid(_ options: IsFingerprintValidOptions, completion: @escaping (Result?, Error?) -> Void) {
        guard let userID = options.getUserID() else {
            completion(nil, CustomError.userIDMissing)
            return
        }

        guard let fingerprint = options.getFingerprint() else {
            completion(nil, CustomError.fingerprintMissing)
            return
        }

        do {
            let isValid = try bridgefy.isFingerprintValid(userID, fingerprint)

            let result = IsFingerprintValidResult(isValid)

            completion(result, nil)
        } catch {
            completion(nil, error)
        }
    }

    /**
     * Payload
     */

    @objc public func send(_ options: SendOptions, completion: @escaping (Result?, Error?) -> Void) {
        guard let data = options.getData() else {
            completion(nil, CustomError.payloadMissing)
            return
        }

        guard let transmissionMode = options.getTransmissionMode() else {
            completion(nil, CustomError.transmissionModeMissing)
            return
        }

        do {
            let messageID = try bridgefy.send(data, transmissionMode)

            let result = SendResult(messageID)

            completion(result, nil)
        } catch {
            completion(nil, error)
        }
    }

    /**
     * Permissions
     */

    @objc public func checkPermissions(completion: @escaping (Result?, Error?) -> Void) {
        let bluetoothState = switch CBCentralManager().state {
        case .unknown:
            "denied"
        case .resetting:
            "prompt"
        case .unsupported:
            "denied"
        case .unauthorized:
            "denied"
        case .poweredOff:
            "prompt"
        case .poweredOn:
            "granted"
        }
        let locationState = "granted"

        let result = PermissionsResult(bluetooth: bluetoothState, location: locationState)

        completion(result, nil)
    }

    @objc public func requestPermissions(_ options: RequestPermissionsOptions, completion: @escaping (Error?) -> Void) {
        guard let permissions = options.getPermissions() else {
            return
        }

        for permission in permissions {
            switch permission {
            case "bluetooth":
                guard let settingsUrl = URL(string: UIApplication.openSettingsURLString) else {
                    completion(CustomError.openSettingsError)
                    return
                }

                DispatchQueue.main.async {
                    if UIApplication.shared.canOpenURL(settingsUrl) {
                        UIApplication.shared.open(settingsUrl, completionHandler: { (success) in
                            if !success {
                                completion(CustomError.openSettingsError)
                                return
                            }
                        })
                    } else {
                        completion(CustomError.openSettingsError)
                        return
                    }
                }
            case "location":
                break
            default:
                break
            }
        }

        completion(nil)
    }

}
