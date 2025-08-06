import Foundation
import Capacitor

@objc public class ReceiveEvent: MessageIDEvent {
    let data: Data
    let transmissionMode: (String, UUID)?

    init(_ messageID: UUID, _ data: Data, _ transmissionMode: (String, UUID)?) {
        self.data = data
        self.transmissionMode = transmissionMode

        super.init(messageID)
    }

    override public func toJSObject() -> JSObject {
        var result = super.toJSObject()

        if data.count > 0 {
            result["data"] = data.base64EncodedString()
        }

        if let transmissionMode = transmissionMode {
            var jsTransmissionMode = JSObject()

            jsTransmissionMode["type"] = transmissionMode.0
            jsTransmissionMode["uuid"] = transmissionMode.1.uuidString.lowercased()

            result["transmissionMode"] = jsTransmissionMode
        }

        return result
    }
}
