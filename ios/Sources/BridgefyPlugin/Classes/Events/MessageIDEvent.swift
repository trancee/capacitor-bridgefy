import Foundation
import Capacitor

@objc public class MessageIDEvent: NSObject {
    let messageID: UUID

    init(_ messageID: UUID) {
        self.messageID = messageID
    }

    public func toJSObject() -> JSObject {
        var result = JSObject()

        result["messageID"] = messageID.uuidString.lowercased()

        return result
    }
}
