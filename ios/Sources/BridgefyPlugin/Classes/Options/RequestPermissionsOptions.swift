import Foundation
import Capacitor

@objc public class RequestPermissionsOptions: NSObject {
    private var permissions: [String]?

    init(_ call: CAPPluginCall) {
        if let permissions = call.getArray("permissions") {
            for permission in permissions {
                if let permission = permission as? String {
                    self.permissions?.append(permission)
                }
            }
        }
    }

    func getPermissions() -> [String]? {
        return permissions
    }
}
