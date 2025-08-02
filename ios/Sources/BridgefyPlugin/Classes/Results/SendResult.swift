import Foundation
import Capacitor

@objc public class SendResult: NSObject, Result {
    let messageID: UUID?

    init(_ messageID: UUID?) {
        self.messageID = messageID
    }

    public func toJSObject() -> AnyObject {
        var result = JSObject()

        if let messageID = messageID {
            result["messageID"] = messageID.uuidString.lowercased()
        }

        return result as AnyObject
    }
}
