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

        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise)
    ]

    public let tag = "BridgefyPlugin"

    // Initialization Listeners

    let STARTED_EVENT = "onStarted"
    let FAIL_TO_START_EVENT = "onFailToStart"
    let STOPPED_EVENT = "onStopped"
    let FAIL_TO_STOP_EVENT = "onFailToStop"
    let DESTROY_SESSION_EVENT = "onDestroySession"
    let FAIL_TO_DESTROY_SESSION_EVENT = "onFailToDestroySession"

    // Connectivity Listeners

    let CONNECTED_EVENT = "onConnected"
    let DISCONNECTED_EVENT = "onDisconnected"
    let CONNECTED_PEERS_EVENT = "onConnectedPeers"
    let ESTABLISH_SECURE_CONNECTION_EVENT = "onEstablishSecureConnection"
    let FAIL_TO_ESTABLISH_SECURE_CONNECTION_EVENT = "onFailToEstablishSecureConnection"

    // Transmission Listeners

    let SEND_EVENT = "onSend"
    let FAIL_TO_SEND_EVENT = "onFailToSend"
    let PROGRESS_OF_SEND_EVENT = "onProgressOfSend"
    let RECEIVE_DATA_EVENT = "onReceiveData"

    private var implementation: Bridgefy!
    private var config: BridgefyConfig!

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

        implementation.initialize(options, completion: { error in
            if let error = error {
                self.rejectCall(call, error)
            } else {
                self.resolveCall(call)
            }
        })
    }

    @objc func isInitialized(_ call: CAPPluginCall) {
        implementation.isInitialized(completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    @objc func start(_ call: CAPPluginCall) {
        let options = StartOptions(call)

        implementation.start(options, completion: { error in
            if let error = error {
                self.rejectCall(call, error)
            } else {
                self.resolveCall(call)
            }
        })
    }

    @objc func isStarted(_ call: CAPPluginCall) {
        implementation.isStarted(completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    @objc func stop(_ call: CAPPluginCall) {
        implementation.stop(completion: { error in
            if let error = error {
                self.rejectCall(call, error)
            } else {
                self.resolveCall(call)
            }
        })
    }

    /**
     * Permissions
     */

    @objc override public func checkPermissions(_ call: CAPPluginCall) {
        implementation.checkPermissions(completion: { result, error in
            if let error = error {
                self.rejectCall(call, error)
            } else if let result = result?.toJSObject() as? JSObject {
                self.resolveCall(call, result)
            }
        })
    }

    @objc override public func requestPermissions(_ call: CAPPluginCall) {
        let options = RequestPermissionsOptions(call)

        implementation.requestPermissions(options, completion: { error in
            if let error = error {
                self.rejectCall(call, error)
            } else {
                self.resolveCall(call, nil)
            }
        })
    }

    /**
     * Initialization Listeners
     */

    func onStartedEvent(_ userID: UUID) {
        let event: StartedEvent = .init(userID)

        notifyListeners(self.STARTED_EVENT, data: event.toJSObject())
    }

    func onFailToStartEvent(_ error: BridgefyError?) {
        let event: FailToStartEvent = .init(error)

        notifyListeners(self.FAIL_TO_START_EVENT, data: event.toJSObject())
    }

    func onStoppedEvent() {
        let event: StoppedEvent = .init()

        notifyListeners(self.STOPPED_EVENT, data: event.toJSObject())
    }

    func onFailToStopEvent(_ error: BridgefyError?) {
        let event: FailToStopEvent = .init(error)

        notifyListeners(self.FAIL_TO_STOP_EVENT, data: event.toJSObject())
    }

    func onDestroySessionEvent() {
        let event: DestroySessionEvent = .init()

        notifyListeners(self.DESTROY_SESSION_EVENT, data: event.toJSObject())
    }

    func onFailToDestroySessionEvent(_ error: BridgefyError?) {
        let event: FailToDestroySessionEvent = .init(error)

        notifyListeners(self.FAIL_TO_DESTROY_SESSION_EVENT, data: event.toJSObject())
    }

    /**
     * Connectivity Listeners
     */

    func onConnectedEvent(_ peerID: UUID) {
        let event: ConnectedEvent = .init(peerID)

        notifyListeners(self.CONNECTED_EVENT, data: event.toJSObject())
    }

    func onDisconnectedEvent(_ peerID: UUID) {
        let event: DisconnectedEvent = .init(peerID)

        notifyListeners(self.DISCONNECTED_EVENT, data: event.toJSObject())
    }

    func onEstablishSecureConnectionEvent(_ userID: UUID) {
        let event: EstablishSecureConnectionEvent = .init(userID)

        notifyListeners(self.ESTABLISH_SECURE_CONNECTION_EVENT, data: event.toJSObject())
    }

    func onFailToEstablishSecureConnectionEvent(_ userID: UUID, _ error: BridgefyError?) {
        let event: FailToEstablishSecureConnectionEvent = .init(userID, error)

        notifyListeners(self.FAIL_TO_ESTABLISH_SECURE_CONNECTION_EVENT, data: event.toJSObject())
    }

    /**
     * Transmission Listeners
     */

    func onSendEvent(_ messageID: UUID) {
        let event: SendEvent = .init(messageID)

        notifyListeners(self.SEND_EVENT, data: event.toJSObject())
    }

    func onFailToSendEvent(_ messageID: UUID, _ error: BridgefyError?) {
        let event: FailToSendEvent = .init(messageID, error)

        notifyListeners(self.FAIL_TO_SEND_EVENT, data: event.toJSObject())
    }

    func onReceiveDataEvent(_ messageID: UUID, _ data: Data, _ transmissionMode: (String, UUID)?) {
        let event: ReceiveDataEvent = .init(messageID, data, transmissionMode)

        notifyListeners(self.RECEIVE_DATA_EVENT, data: event.toJSObject())
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
