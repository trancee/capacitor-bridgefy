import Foundation
import Capacitor

@objc public class UserIDEvent: NSObject {
    let userID: UUID

    init(_ userID: UUID) {
        self.userID = userID
    }

    public func toJSObject() -> JSObject {
        var result = JSObject()

        result["userID"] = userID.uuidString.lowercased()

        return result
    }
}
