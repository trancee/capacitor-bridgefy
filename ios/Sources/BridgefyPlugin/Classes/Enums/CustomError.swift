import Foundation

public enum CustomError: Error {
    case apiKeyMissing
    
    case openSettingsError
}

extension CustomError: LocalizedError {
    public var errorDescription: String? {
        switch self {
        case .apiKeyMissing:
            return NSLocalizedString("missing API key", comment: "apiKeyMissing")

        case .openSettingsError:
            return NSLocalizedString("open settings error", comment: "openSettingsError")
        }
    }
}
