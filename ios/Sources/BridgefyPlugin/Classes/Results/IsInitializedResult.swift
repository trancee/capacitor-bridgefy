import Foundation
import Capacitor

@objc public class IsInitializedResult: NSObject, Result {
    let isInitialized: Bool

    init(_ isInitialized: Bool) {
        self.isInitialized = isInitialized
    }

    public func toJSObject() -> AnyObject {
        var result = JSObject()

        result["isInitialized"] = isInitialized

        return result as AnyObject
    }
}
