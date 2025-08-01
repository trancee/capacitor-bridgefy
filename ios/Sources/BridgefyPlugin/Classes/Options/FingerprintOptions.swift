import Foundation
import Capacitor

@objc public class FingerprintOptions: NSObject {
    private var userID: UUID?

    init(_ call: CAPPluginCall) {
        super.init()

        if let userID = call.getString("userID") {
            self.setUserID(userID)
        }
    }

    func setUserID(_ userID: String?) {
        self.userID = Helper.makeUUID(userID)
    }

    func getUserID() -> UUID? {
        return self.userID
    }
}
