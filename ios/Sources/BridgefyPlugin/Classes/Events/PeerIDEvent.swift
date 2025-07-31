import Foundation
import Capacitor

@objc public class PeerIDEvent: NSObject {
    let peerID: UUID

    init(_ peerID: UUID) {
        self.peerID = peerID
    }

    public func toJSObject() -> JSObject {
        var result = JSObject()

        result["peerID"] = peerID.uuidString.lowercased()

        return result
    }
}
