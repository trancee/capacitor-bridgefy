import Foundation
import Capacitor

@objc public class InitializeOptions: NSObject {
    private var apiKey: UUID?
    private var verboseLogging: Bool?

    init(_ call: CAPPluginCall) {
        super.init()

        if let apiKey = call.getString("apiKey") {
            self.setAPIKey(apiKey)
        }

        if let verboseLogging = call.getString("verboseLogging") {
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
}
