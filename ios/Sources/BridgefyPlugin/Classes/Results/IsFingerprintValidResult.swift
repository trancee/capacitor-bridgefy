import Foundation
import Capacitor

@objc public class IsFingerprintValidResult: NSObject, Result {
    let isValid: Bool

    init(_ isValid: Bool) {
        self.isValid = isValid
    }

    public func toJSObject() -> AnyObject {
        var result = JSObject()

        result["isValid"] = isValid

        return result as AnyObject
    }
}
