import Capacitor

public class BridgefyConfig {
    private var userID: UUID?

    private var apiKey: UUID?
    private var verboseLogging: Bool?

    init(config: PluginConfig) {
        self.userID = UIDevice.current.identifierForVendor

        if let apiKey = config.getString("apiKey") {
            self.setAPIKey(apiKey)
        }

        if let verboseLogging = config.getString("verboseLogging") {
            self.setVerboseLogging(verboseLogging)
        }
    }

    func setAPIKey(_ apiKey: String?) {
        self.apiKey = Helper.makeUUID(apiKey)
    }
    func setVerboseLogging(_ verboseLogging: String?) {
        self.verboseLogging = Helper.makeBoolean(verboseLogging)
    }

    func getAPIKey() -> UUID? {
        return self.apiKey
    }
    func getVerboseLogging() -> Bool? {
        return self.verboseLogging
    }

    func getUserID() -> UUID? {
        return self.userID
    }
}
