import Foundation
import Capacitor

@objc public class FailToStopEvent: FailToEvent {

    override public func toJSObject() -> JSObject {
        var result = JSObject()

        result["reason"] = super.toJSObject()

        return result
    }
}
