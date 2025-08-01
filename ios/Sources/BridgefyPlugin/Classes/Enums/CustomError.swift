import Foundation

public enum CustomError: Error {
    case apiKeyMissing

    case userIDMissing
    case fingerprintMissing
    case payloadMissing
    case transmissionModeMissing

    case openSettingsError
}

extension CustomError: LocalizedError {
    public var errorDescription: String? {
        switch self {
        case .apiKeyMissing:
            return NSLocalizedString("missing API key", comment: "apiKeyMissing")

        case .userIDMissing:
            return NSLocalizedString("missing user identifier", comment: "userIDMissing")
        case .fingerprintMissing:
            return NSLocalizedString("missing fingerprint", comment: "fingerprintMissing")
        case .payloadMissing:
            return NSLocalizedString("missing payload", comment: "payloadMissing")
        case .transmissionModeMissing:
            return NSLocalizedString("missing transmission mode", comment: "transmissionModeMissing")

        case .openSettingsError:
            return NSLocalizedString("open settings error", comment: "openSettingsError")
        }
    }
}
