import Foundation

public class BridgefyHelper {

    static func makeBoolean(_ value: String?) -> Bool? {
        guard let value = value, !value.isEmpty else {
            return nil
        }

        return NSString(string: value).boolValue
    }

    static func makeUUID(_ value: String?) -> UUID? {
        guard let value = value, !value.isEmpty else {
            return nil
        }

        return UUID(uuidString: value)
    }

}

typealias Helper = BridgefyHelper
