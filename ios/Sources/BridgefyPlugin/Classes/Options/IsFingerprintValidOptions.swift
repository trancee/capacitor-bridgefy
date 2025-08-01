import Foundation
import Capacitor

@objc public class IsFingerprintValidOptions: NSObject {
    private var userID: UUID?
    private var fingerprint: Data?

    init(_ call: CAPPluginCall) {
        super.init()

        if let userID = call.getString("userID") {
            self.setUserID(userID)
        }
        if let fingerprint = call.getString("fingerprint") {
            self.setFingerprint(fingerprint)
        }
    }

    func setUserID(_ userID: String?) {
        self.userID = Helper.makeUUID(userID)
    }
    func setFingerprint(_ fingerprint: String?) {
        self.fingerprint = Helper.makeData(fingerprint)
    }

    func getUserID() -> UUID? {
        return self.userID
    }
    func getFingerprint() -> Data? {
        return self.fingerprint
    }
}
