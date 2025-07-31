import Foundation
import Capacitor

@objc public class IsStartedResult: NSObject, Result {
    let isStarted: Bool

    init(_ isStarted: Bool) {
        self.isStarted = isStarted
    }

    public func toJSObject() -> AnyObject {
        var result = JSObject()

        result["isStarted"] = isStarted

        return result as AnyObject
    }
}
