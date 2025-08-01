import Foundation
import Capacitor

@objc public class SendOptions: NSObject {
    private var data: Data?
    private var transmissionMode: (String, UUID)?

    init(_ call: CAPPluginCall) {
        super.init()

        if let data = call.getString("data") {
            self.setData(data)
        }

        if let transmissionMode = call.getObject("transmissionMode") {
            self.setTransmissionMode(transmissionMode["type"] as? String, transmissionMode["uuid"] as? String)
        }
    }

    func setData(_ data: String?) {
        self.data = Helper.makeData(data)
    }
    func setTransmissionMode(_ type: String?, _ uuid: String?) {
        if let type = type, let uuid = Helper.makeUUID(uuid) {
            self.transmissionMode = (type, uuid)
        }
    }

    func getData() -> Data? {
        return self.data
    }
    func getTransmissionMode() -> (String, UUID)? {
        return self.transmissionMode
    }
}
