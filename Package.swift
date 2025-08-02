// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorTranceeBridgefy",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapacitorTranceeBridgefy",
            targets: ["BridgefyPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.4.2"),
        .package(url: "https://github.com/bridgefy/sdk-ios.git", from: "1.2.3")
    ],
    targets: [
        .target(
            name: "BridgefyPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                .product(name: "BridgefySDK", package: "sdk-ios")
            ],
            path: "ios/Sources/BridgefyPlugin"),
        .testTarget(
            name: "BridgefyPluginTests",
            dependencies: ["BridgefyPlugin"],
            path: "ios/Tests/BridgefyPluginTests")
    ]
)
