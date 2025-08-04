import Capacitor

public class BridgefyConfig {
    private var userID: UUID?

    private var apiKey: UUID?
    private var verboseLogging: Bool?

    private var propagationProfile: String?

    init(config: PluginConfig) {
        // self.userID = UIDevice.current.identifierForVendor

        if let apiKey = config.getString("apiKey") {
            self.setAPIKey(apiKey)
        }

        if let verboseLogging = config.getString("verboseLogging") {
            self.setVerboseLogging(verboseLogging)
        }

        if let propagationProfile = config.getString("propagationProfile") {
            self.setPropagationProfile(propagationProfile)
        }
    }

    func setAPIKey(_ apiKey: String?) {
        self.apiKey = Helper.makeUUID(apiKey)
    }
    func setVerboseLogging(_ verboseLogging: String?) {
        self.verboseLogging = Helper.makeBoolean(verboseLogging)
    }
    func setPropagationProfile(_ propagationProfile: String?) {
        self.propagationProfile = propagationProfile
    }

    func getAPIKey() -> UUID? {
        return self.apiKey
    }
    func getVerboseLogging() -> Bool? {
        return self.verboseLogging
    }
    func getPropagationProfile() -> String? {
        return self.propagationProfile
    }

    func getUserID() -> UUID? {
        return self.userID
    }
}
