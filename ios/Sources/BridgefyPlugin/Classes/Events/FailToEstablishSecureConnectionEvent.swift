import Foundation
import Capacitor

@objc public class FailToEstablishSecureConnectionEvent: FailToEvent {
    let userID: UUID

    init(_ userID: UUID, _ error: BridgefyError?) {
        self.userID = userID

        super.init(error)
    }

    override public func toJSObject() -> JSObject {
        var result = super.toJSObject()

        result["userID"] = userID.uuidString.lowercased()

        return result
    }
}
