import Foundation
import Capacitor

@objc public class LicenseExpirationDateResult: NSObject, Result {
    let licenseExpirationDate: Date?

    init(_ licenseExpirationDate: Date?) {
        self.licenseExpirationDate = licenseExpirationDate
    }

    public func toJSObject() -> AnyObject {
        var result = JSObject()

        if let licenseExpirationDate = licenseExpirationDate {
            result["licenseExpirationDate"] = licenseExpirationDate.timeIntervalSince1970 * 1000
        }

        return result as AnyObject
    }
}
