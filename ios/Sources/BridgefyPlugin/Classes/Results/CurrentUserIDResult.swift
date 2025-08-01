import Foundation
import Capacitor

@objc public class CurrentUserIDResult: NSObject, Result {
    let currentUserID: UUID?

    init(_ currentUserID: UUID?) {
        self.currentUserID = currentUserID
    }

    public func toJSObject() -> AnyObject {
        var result = JSObject()

        if let currentUserID = currentUserID {
            result["currentUserID"] = currentUserID.uuidString
        }

        return result as AnyObject
    }
}
