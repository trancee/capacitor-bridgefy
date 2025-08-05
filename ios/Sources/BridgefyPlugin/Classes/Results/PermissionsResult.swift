import Foundation
import Capacitor

@objc public class PermissionsResult: NSObject, Result {
    let bluetooth: String
    let location: String?
    let background: String?

    init(bluetooth: String, location: String? = nil, background: String? = nil) {
        self.bluetooth = bluetooth
        self.location = location
        self.background = background
    }

    public func toJSObject() -> AnyObject {
        var result = JSObject()

        result["bluetooth"] = bluetooth

        if let location = location {
            result["location"] = location
        }
        if let background = background {
            result["background"] = background
        }

        return result as AnyObject
    }
}
