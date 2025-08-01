import Foundation
import Capacitor

@objc public class ConnectedPeersResult: NSObject, Result {
    let connectedPeers: [UUID]?

    init(_ connectedPeers: [UUID]?) {
        self.connectedPeers = connectedPeers
    }

    public func toJSObject() -> AnyObject {
        var result = JSObject()

        if let connectedPeers = connectedPeers {
            var jsPeers = JSArray()

            jsPeers.reserveCapacity(connectedPeers.count)

            for peer in connectedPeers {
                jsPeers.append(peer.uuidString)
            }

            result["peers"] = jsPeers
        }

        return result as AnyObject
    }
}
