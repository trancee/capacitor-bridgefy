import Foundation
import Capacitor

@objc public class FailToEvent: NSObject {
    let error: BridgefyError?

    init(_ error: BridgefyError?) {
        self.error = error
    }

    public func toJSObject() -> JSObject {
        var result = JSObject()

        if let error = error {
            result["type"] = error.type

            if let message = error.message {
                if !message.isEmpty {
                    result["message"] = message
                }
            }

            if let code = error.code {
                result["code"] = code
            }
        }

        return result
    }
}
