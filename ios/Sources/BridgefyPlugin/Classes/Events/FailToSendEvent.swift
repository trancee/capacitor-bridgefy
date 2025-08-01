import Foundation
import Capacitor

@objc public class FailToSendEvent: FailToEvent {
    let messageID: UUID

    init(_ messageID: UUID, _ error: BridgefyError?) {
        self.messageID = messageID

        super.init(error)
    }

    override public func toJSObject() -> JSObject {
        var result = JSObject()

        result["messageID"] = messageID.uuidString.lowercased()
        result["reason"] = super.toJSObject()

        return result
    }
}
