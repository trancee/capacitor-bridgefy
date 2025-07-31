import Foundation
import Capacitor

@objc public class StartOptions: NSObject {
    private var userID: UUID?
    private var propagationProfile: String?

    init(_ call: CAPPluginCall) {
        super.init()

        if let userID = call.getString("userID") {
            self.setUserID(userID)
        }

        if let propagationProfile = call.getString("propagationProfile") {
            self.setPropagationProfile(propagationProfile)
        }
    }

    func setUserID(_ userID: String?) {
        self.userID = Helper.makeUUID(userID)
    }
    func setPropagationProfile(_ propagationProfile: String?) {
        self.propagationProfile = propagationProfile
    }

    func getUserID() -> UUID? {
        return self.userID
    }
    func getPropagationProfile() -> String? {
        return self.propagationProfile
    }
}
