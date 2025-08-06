import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(BridgefyPlugin)
public class BridgefyPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "BridgefyPlugin"
    public let jsName = "Bridgefy"

    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isInitialized", returnType: CAPPluginReturnPromise),

        CAPPluginMethod(name: "start", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isStarted", returnType: CAPPluginReturnPromise),

        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise),

        CAPPluginMethod(name: "licenseExpirationDate", returnType: CAPPluginReturnPromise),

        CAPPluginMethod(name: "destroySession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "currentUserID", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "connectedPeers", returnType: CAPPluginReturnPromise),

        CAPPluginMethod(name: "establishSecureConnection", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "fingerprint", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isFingerprintValid", returnType: CAPPluginReturnPromise),

        CAPPluginMethod(name: "send", returnType: CAPPluginReturnPromise),

        CAPPluginMethod(name: "checkPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermissions", returnType: CAPPluginReturnPromise)
    ]

    public let tag = "BridgefyPlugin"

    // Initialization Listeners

    let eventStarted = "onStarted"
    let eventFailToStart = "onFailToStart"
    let eventStopped = "onStopped"
    let eventFailToStop = "onFailToStop"
    let eventDestroySession = "onDestroySession"
    let eventFailToDestroySession = "onFailToDestroySession"

    // Connectivity Listeners

    let eventConnected = "onConnected"
    let eventDisconnected = "onDisconnected"
    let eventConnectedPeers = "onConnectedPeers"
    let eventEstablishSecureConnection = "onEstablishSecureConnection"
    let eventFailToEstablishSecureConnection = "onFailToEstablishSecureConnection"

    // Transmission Listeners

    let eventSend = "onSend"
    let eventFailToSend = "onFailToSend"
    let eventProgress = "onProgress"
    let eventReceive = "onReceive"

    private var implementation: Bridgefy?
    private var config: BridgefyConfig?

    override public func load() {
        super.load()

        self.config = BridgefyConfig(config: getConfig())
        self.implementation = Bridgefy(plugin: self, config: self.config)
    }

    /**
     * Initialize
     */

    @objc func initialize(_ call: CAPPluginCall) {
        let options = InitializeOptions(call)

        implementation?.initialize(options, completion: { error in
            if let error = error {
                self.rejectCall(call, error)
            } else {
                self.resolveCall(call)
            }
        })
    }

    @objc func isInitialized(_ call: CAPPluginCall) {
        implementation?.isInitialized(completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    @objc func start(_ call: CAPPluginCall) {
        let options = StartOptions(call)

        implementation?.start(options, completion: { error in
            if let error = error {
                self.rejectCall(call, error)
            } else {
                self.resolveCall(call)
            }
        })
    }

    @objc func isStarted(_ call: CAPPluginCall) {
        implementation?.isStarted(completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    @objc func stop(_ call: CAPPluginCall) {
        implementation?.stop(completion: { error in
            if let error = error {
                self.rejectCall(call, error)
            } else {
                self.resolveCall(call)
            }
        })
    }

    /**
     * License
     */

    @objc func licenseExpirationDate(_ call: CAPPluginCall) {
        implementation?.licenseExpirationDate(completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    /**
     * Session
     */

    @objc func destroySession(_ call: CAPPluginCall) {
        implementation?.destroySession(completion: { error in
            if let error = error {
                self.rejectCall(call, error)
            } else {
                self.resolveCall(call)
            }
        })
    }

    @objc func currentUserID(_ call: CAPPluginCall) {
        implementation?.currentUserID(completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    @objc func connectedPeers(_ call: CAPPluginCall) {
        implementation?.connectedPeers(completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    /**
     * Secure Connection
     */

    @objc func establishSecureConnection(_ call: CAPPluginCall) {
        let options = EstablishSecureConnectionOptions(call)

        implementation?.establishSecureConnection(options, completion: { error in
            if let error = error {
                self.rejectCall(call, error)
            } else {
                self.resolveCall(call)
            }
        })
    }

    @objc func fingerprint(_ call: CAPPluginCall) {
        let options = FingerprintOptions(call)

        implementation?.fingerprint(options, completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    @objc func isFingerprintValid(_ call: CAPPluginCall) {
        let options = IsFingerprintValidOptions(call)

        implementation?.isFingerprintValid(options, completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    /**
     * Payload
     */

    @objc func send(_ call: CAPPluginCall) {
        let options = SendOptions(call)

        implementation?.send(options, completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    /**
     * Permissions
     */

    @objc override public func checkPermissions(_ call: CAPPluginCall) {
        implementation?.checkPermissions(completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    @objc override public func requestPermissions(_ call: CAPPluginCall) {
        let options = RequestPermissionsOptions(call)

        implementation?.requestPermissions(options, completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    /**
     * Initialization Listeners
     */

    func onStartedEvent(_ userID: UUID) {
        let event: StartedEvent = .init(userID)

        notifyListeners(self.eventStarted, data: event.toJSObject())
    }

    func onFailToStartEvent(_ error: BridgefyError?) {
        let event: FailToStartEvent = .init(error)

        notifyListeners(self.eventFailToStart, data: event.toJSObject())
    }

    func onStoppedEvent() {
        let event: StoppedEvent = .init()

        notifyListeners(self.eventStopped, data: event.toJSObject())
    }

    func onFailToStopEvent(_ error: BridgefyError?) {
        let event: FailToStopEvent = .init(error)

        notifyListeners(self.eventFailToStop, data: event.toJSObject())
    }

    func onDestroySessionEvent() {
        let event: DestroySessionEvent = .init()

        notifyListeners(self.eventDestroySession, data: event.toJSObject())
    }

    func onFailToDestroySessionEvent(_ error: BridgefyError?) {
        let event: FailToDestroySessionEvent = .init(error)

        notifyListeners(self.eventFailToDestroySession, data: event.toJSObject())
    }

    /**
     * Connectivity Listeners
     */

    func onConnectedEvent(_ peerID: UUID) {
        let event: ConnectedEvent = .init(peerID)

        notifyListeners(self.eventConnected, data: event.toJSObject())
    }

    func onDisconnectedEvent(_ peerID: UUID) {
        let event: DisconnectedEvent = .init(peerID)

        notifyListeners(self.eventDisconnected, data: event.toJSObject())
    }

    func onEstablishSecureConnectionEvent(_ userID: UUID) {
        let event: EstablishSecureConnectionEvent = .init(userID)

        notifyListeners(self.eventEstablishSecureConnection, data: event.toJSObject())
    }

    func onFailToEstablishSecureConnectionEvent(_ userID: UUID, _ error: BridgefyError?) {
        let event: FailToEstablishSecureConnectionEvent = .init(userID, error)

        notifyListeners(self.eventFailToEstablishSecureConnection, data: event.toJSObject())
    }

    /**
     * Transmission Listeners
     */

    func onSendEvent(_ messageID: UUID) {
        let event: SendEvent = .init(messageID)

        notifyListeners(self.eventSend, data: event.toJSObject())
    }

    func onFailToSendEvent(_ messageID: UUID, _ error: BridgefyError?) {
        let event: FailToSendEvent = .init(messageID, error)

        notifyListeners(self.eventFailToSend, data: event.toJSObject())
    }

    func onReceiveEvent(_ messageID: UUID, _ data: Data, _ transmissionMode: (String, UUID)?) {
        let event: ReceiveEvent = .init(messageID, data, transmissionMode)

        notifyListeners(self.eventReceive, data: event.toJSObject())
    }

    /**
     * Calls
     */

    private func rejectCall(_ call: CAPPluginCall, _ error: Error) {
        CAPLog.print("[", self.tag, "] ", error)
        call.reject(error.localizedDescription)
    }

    private func resolveCall(_ call: CAPPluginCall, _ result: JSObject? = nil) {
        if let result {
            call.resolve(result)
        } else {
            call.resolve()
        }
    }
}
