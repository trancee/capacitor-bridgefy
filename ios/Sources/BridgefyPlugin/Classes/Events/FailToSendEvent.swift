import Foundation
import Capacitor

@objc public class FailToSendEvent: FailToEvent {
    let messageID: UUID

    init(_ messageID: UUID, _ error: BridgefyError?) {
        self.messageID = messageID

        super.init(error)
    }

    override public func toJSObject() -> JSObject {
        var result = super.toJSObject()

        result["messageID"] = messageID.uuidString.lowercased()

        return result
    }
}
