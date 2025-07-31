import Foundation

public class BridgefyError: NSObject {
    let type: String
    let message: String?
    let code: Int?

    init(_ type: String, message: String? = nil, code: Int? = nil) {
        self.type = type
        self.message = message
        self.code = code
    }
}
