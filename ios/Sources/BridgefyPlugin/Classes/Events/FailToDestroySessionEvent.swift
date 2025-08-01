import Foundation
import Capacitor

@objc public class FailToDestroySessionEvent: FailToEvent {

    override public func toJSObject() -> JSObject {
        var result = JSObject()

        result["reason"] = super.toJSObject()

        return result
    }
}
