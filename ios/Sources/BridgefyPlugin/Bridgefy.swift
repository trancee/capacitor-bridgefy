import Foundation

@objc public class Bridgefy: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
