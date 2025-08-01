import Foundation
import Capacitor

@objc public class FingerprintResult: NSObject, Result {
    let fingerprint: Data

    init(_ fingerprint: Data) {
        self.fingerprint = fingerprint
    }

    public func toJSObject() -> AnyObject {
        var result = JSObject()

        if fingerprint.count > 0 {
            result["fingerprint"] = fingerprint.base64EncodedString()
        }

        return result as AnyObject
    }
}
