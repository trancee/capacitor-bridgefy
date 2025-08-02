/// <reference types='@capacitor/cli' />

import type { PermissionState, PluginListenerHandle } from '@capacitor/core';

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    /**
     * These configuration values are available:
     *
     * @since 1.0.0
     */
    Bridgefy?: {
      /**
       * The API key for Bridgefy.
       *
       * @example '123e4567-e89b-12d3-a456-426614174000'
       * @since 1.0.0
       */
      apiKey?: UUID;

      /**
       * If `true`, enables verbose logging for debugging purposes.
       *
       * @default false
       * @example true
       * @since 1.0.0
       */
      verboseLogging?: boolean;
    };
  }
}

export type Base64 = string & { readonly __brand: unique symbol };
export function isBase64(value: string): value is Base64 {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value);
}
export function Base64(value: string): Base64 {
  return isBase64(value) ? (value as Base64) : (undefined as never);
}

export type UUID = string & { readonly __brand: unique symbol };
export function isUUID(value: string): value is UUID {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
export function UUID(value: string): UUID {
  return isUUID(value) ? (value as UUID) : (undefined as never);
}

export type UserID = UUID;
export type PeerID = UUID;
export type MessageID = UUID;

export interface BridgefyPlugin {
  /**
   * Initialization
   */

  /**
   * Initializes Bridgefy operations.
   *
   * An Internet connection is needed at least for the first time in order to validate the license.
   *
   * @since 1.0.0
   */
  initialize(options: InitializeOptions): Promise<void>;
  /**
   * Checks if the Bridgefy SDK has been initialized.
   *
   * @since 1.0.0
   */
  isInitialized(): Promise<IsInitializedResult>;

  /**
   * Starts Bridgefy operations, allowing the SDK to participate in the Bridgefy network.
   *
   * @since 1.0.0
   */
  start(options: StartOptions): Promise<void>;
  /**
   * Indicates whether the Bridgefy SDK is currently started.
   *
   * @since 1.0.0
   */
  isStarted(): Promise<IsStartedResult>;

  /**
   * Stops Bridgefy operations and releases associated resources.
   *
   * @since 1.0.0
   */
  stop(): Promise<void>;

  /**
   * License
   */

  /**
   * Retrieves the expiration date of the Bridgefy license.
   *
   * @since 1.0.0
   */
  licenseExpirationDate(): Promise<LicenseExpirationDateResult>;

  /**
   * Updates the Bridgefy license, if necessary.
   *
   * ![Android](assets/android.svg) Only available for Android.
   *
   * @since 1.0.0
   */
  updateLicense(): Promise<void>;

  /**
   * Session
   */

  /**
   * Destroys the current session, terminating any active connections and cleaning up resources.
   *
   * @since 1.0.0
   */
  destroySession(): Promise<void>;

  /**
   * Retrieves the `UUID` of the current Bridgefy user.
   *
   * @since 1.0.0
   */
  currentUserID(): Promise<CurrentUserIDResult>;

  /**
   * Retrieves a list of `UUID`s representing the connected peers in the current session.
   *
   * @since 1.0.0
   */
  connectedPeers(): Promise<ConnectedPeersResult>;

  /**
   * Secure Connection
   */

  /**
   * Establishes a secure connection with the user.
   *
   * @since 1.0.0
   */
  establishSecureConnection(options: EstablishSecureConnectionOptions): Promise<void>;

  /**
   * Generates a fingerprint for the secure connection established with a specified user.
   *
   * @since 1.0.0
   */
  fingerprint(options: FingerprintOptions): Promise<FingerprintResult>;

  /**
   * Verifies the validity of a fingerprint for a particular user.
   *
   * @since 1.0.0
   */
  isFingerprintValid(options: IsFingerprintValidOptions): Promise<IsFingerprintValidResult>;

  /**
   * Payload
   */

  /**
   * Sends data using a specific transmission mode.
   *
   * @since 1.0.0
   */
  send(options: SendOptions): Promise<SendResult>;

  /**
   * Permissions
   */

  /**
   * Check for the appropriate permissions to use Nearby.
   *
   * @since 1.0.0
   */
  checkPermissions(): Promise<PermissionStatus>;
  /**
   * Request the appropriate permissions to use Nearby.
   *
   * @since 1.0.0
   */
  requestPermissions(permissions?: Permissions): Promise<PermissionStatus>;

  /**
   * Initialization Listeners
   */
  addListener(eventName: 'onStarted', listenerFunc: OnStartedListener): Promise<PluginListenerHandle>;
  addListener(eventName: 'onFailToStart', listenerFunc: OnFailToStartListener): Promise<PluginListenerHandle>;
  addListener(eventName: 'onStopped', listenerFunc: () => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onFailToStop', listenerFunc: OnFailToStopListener): Promise<PluginListenerHandle>;
  addListener(eventName: 'onDestroySession', listenerFunc: () => void): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'onFailToDestroySession',
    listenerFunc: OnFailToDestroySessionListener,
  ): Promise<PluginListenerHandle>;

  /**
   * Connectivity Listeners
   */

  /**
   * When a peer has established connection.
   *
   * @since 1.0.0
   */
  addListener(eventName: 'onConnected', listenerFunc: OnConnectedListener): Promise<PluginListenerHandle>;
  /**
   * When a peer is disconnected (out of range).
   *
   * @since 1.0.0
   */
  addListener(eventName: 'onDisconnected', listenerFunc: OnDisconnectedListener): Promise<PluginListenerHandle>;
  /**
   * When a device is detected, notifies the list of connected users.
   *
   * ![Android](assets/android.svg) Only available for Android.
   *
   * @since 1.0.0
   */
  addListener(eventName: 'onConnectedPeers', listenerFunc: OnConnectedPeersListener): Promise<PluginListenerHandle>;

  /**
   * When an on-demand secure connection was successfully established.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'onEstablishSecureConnection',
    listenerFunc: OnEstablishSecureConnectionListener,
  ): Promise<PluginListenerHandle>;
  /**
   * When an on-demand secure connection failed to establish.
   *
   * @since 1.0.0
   */
  addListener(
    eventName: 'onFailToEstablishSecureConnection',
    listenerFunc: OnFailToEstablishSecureConnectionListener,
  ): Promise<PluginListenerHandle>;

  /**
   * Transmission Listeners
   */

  /**
   * When a message is sent.
   *
   * @since 1.0.0
   */
  addListener(eventName: 'onSend', listenerFunc: OnSendListener): Promise<PluginListenerHandle>;
  /**
   * When a message fails to send.
   *
   * @since 1.0.0
   */
  addListener(eventName: 'onFailToSend', listenerFunc: OnFailToSendListener): Promise<PluginListenerHandle>;
  /**
   * When sending progress update.
   *
   * ![Android](assets/android.svg) Only available for Android.
   *
   * @since 1.0.0
   */
  addListener(eventName: 'onProgressOfSend', listenerFunc: OnProgressOfSendListener): Promise<PluginListenerHandle>;
  /**
   * When data is received.
   *
   * @since 1.0.0
   */
  addListener(eventName: 'onReceiveData', listenerFunc: OnReceiveDataListener): Promise<PluginListenerHandle>;

  /**
   * Remove all listeners for this plugin.
   *
   * @since 1.0.0
   */
  removeAllListeners(): Promise<void>;
}

export type OnStartedListener = (event: OnStartedEvent) => void;
export interface OnStartedEvent {
  userID: UserID;
}
export type OnFailToStartListener = (event: OnFailToStartEvent) => void;
export interface OnFailToStartEvent {
  /**
   * The reason for the failure.
   *
   * @since 1.0.0
   */
  reason: Reason;
}
export type OnFailToStopListener = (event: OnFailToStopEvent) => void;
export interface OnFailToStopEvent {
  /**
   * The reason for the failure.
   *
   * @since 1.0.0
   */
  reason: Reason;
}
export type OnFailToDestroySessionListener = (event: OnFailToDestroySessionEvent) => void;
export interface OnFailToDestroySessionEvent {
  /**
   * The reason for the failure.
   *
   * @since 1.0.0
   */
  reason: Reason;
}

export type OnConnectedListener = (event: OnConnectedEvent) => void;
export interface OnConnectedEvent {
  /**
   * Identifier of the peer that has established a connection.
   *
   * @since 1.0.0
   */
  peerID: PeerID;
}
export type OnDisconnectedListener = (event: OnDisconnectedEvent) => void;
export interface OnDisconnectedEvent {
  /**
   * Identifier of the disconnected peer.
   *
   * @since 1.0.0
   */
  peerID: PeerID;
}
export type OnConnectedPeersListener = (event: OnConnectedPeersEvent) => void;
export interface OnConnectedPeersEvent {
  /**
   * List of identifiers of the connected peers.
   *
   * @since 1.0.0
   */
  peers: PeerID[];
}

export type OnEstablishSecureConnectionListener = (event: OnEstablishSecureConnectionEvent) => void;
export interface OnEstablishSecureConnectionEvent {
  /**
   * Identifier of the user with whom the secure connection is established.
   *
   * @since 1.0.0
   */
  userID: UserID;
}
export type OnFailToEstablishSecureConnectionListener = (event: OnFailToEstablishSecureConnectionEvent) => void;
export interface OnFailToEstablishSecureConnectionEvent {
  /**
   * Identifier of the user with whom the secure connection was attempted.
   *
   * @since 1.0.0
   */
  userID: UserID;
  /**
   * The reason for the failure.
   *
   * @since 1.0.0
   */
  reason: Reason;
}

export type OnSendListener = (event: OnSendEvent) => void;
export interface OnSendEvent {
  /**
   * Identifier of the sent message.
   *
   * @since 1.0.0
   */
  messageID: MessageID;
}
export type OnFailToSendListener = (event: OnFailToSendEvent) => void;
export interface OnFailToSendEvent {
  /**
   * Identifier of the failed message.
   *
   * @since 1.0.0
   */
  messageID: MessageID;
  /**
   * The reason for the failure.
   *
   * @since 1.0.0
   */
  reason: Reason;
}
export type OnProgressOfSendListener = (event: OnProgressOfSendEvent) => void;
export interface OnProgressOfSendEvent {
  /**
   * Identifier of the message being sent.
   *
   * @since 1.0.0
   */
  messageID: MessageID;
  /**
   * Current position of the message being sent.
   *
   * @since 1.0.0
   */
  position: number;
  /**
   * Total size of the message being sent.
   *
   * @since 1.0.0
   */
  of: number;
}
export type OnReceiveDataListener = (event: OnReceiveDataEvent) => void;
export interface OnReceiveDataEvent {
  /**
   * Identifier of the received message.
   *
   * @since 1.0.0
   */
  messageID: MessageID;
  /**
   * The received data, encoded as a `Base64` string.
   *
   * @since 1.0.0
   */
  data: Base64;
  /**
   * The transmission mode used when sending the message.
   *
   * @since 1.0.0
   */
  transmissionMode: TransmissionMode;
}

/**
 * @since 1.0.0
 */
export interface InitializeOptions {
  /**
   * The API key for Bridgefy.
   *
   * @since 1.0.0
   */
  apiKey?: UUID;

  /**
   * If `true`, enables verbose logging for debugging purposes.
   *
   * @since 1.0.0
   */
  verboseLogging?: boolean;
}

/**
 * @since 1.0.0
 */
export interface IsInitializedResult {
  isInitialized?: boolean;
}

/**
 * @since 1.0.0
 */
export interface StartOptions {
  /**
   * The ID used to identify the user in the Bridgefy network.
   *
   * If not provided, a new user ID will be generated.
   */
  userID?: UserID;

  /**
   * A profile that defines a series of properties and rules for the propagation of messages.
   *
   * @default PropagationProfile.STANDARD
   */
  propagationProfile?: PropagationProfile;
}

/**
 * @since 1.0.0
 */
export interface IsStartedResult {
  isStarted?: boolean;
}

/**
 * @since 1.0.0
 */
export interface LicenseExpirationDateResult {
  /**
   * The expiration date of the license.
   *
   * The time in milliseconds that has elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC (equivalent to the UNIX epoch).
   * This timestamp is timezone-agnostic and uniquely defines an instant in history.
   *
   * @since 1.0.0
   */
  licenseExpirationDate?: number;
}

/**
 * @since 1.0.0
 */
export interface CurrentUserIDResult {
  userID?: UserID;
}

/**
 * @since 1.0.0
 */
export interface ConnectedPeersResult {
  peers?: PeerID[];
}

/**
 * @since 1.0.0
 */
export interface SendOptions {
  data: Base64;
  transmissionMode: TransmissionMode;
}

/**
 * @since 1.0.0
 */
export interface SendResult {
  messageID: MessageID;
}

/**
 * @since 1.0.0
 */
export interface EstablishSecureConnectionOptions {
  userID: UserID;
}

/**
 * @since 1.0.0
 */
export interface FingerprintOptions {
  userID: UserID;
}
/**
 * @since 1.0.0
 */
export interface FingerprintResult {
  fingerprint?: Base64;
}

/**
 * @since 1.0.0
 */
export interface IsFingerprintValidOptions {
  userID: UserID;
  fingerprint: Base64;
}
/**
 * @since 1.0.0
 */
export interface IsFingerprintValidResult {
  isValid: boolean;
}

/**
 * @since 1.0.0
 */
export interface Reason {
  type: ReasonType;
  message?: string;
  code?: number;
}

/**
 * @since 1.0.0
 */
export interface PermissionStatus {
  /**
   * `BLUETOOTH_ADVERTISE`  Required to be able to advertise to nearby Bluetooth devices.
   * `BLUETOOTH_CONNECT`  Required to be able to connect to paired Bluetooth devices.
   * `BLUETOOTH_SCAN`  Required to be able to discover and pair nearby Bluetooth devices.
   *
   * `BLUETOOTH`  Allows applications to connect to paired bluetooth devices.
   * `BLUETOOTH_ADMIN`  Allows applications to discover and pair bluetooth devices.
   *
   * @since 0.0.1
   */
  bluetooth: PermissionState;
  /**
   * `ACCESS_FINE_LOCATION`  Allows an app to access precise location.
   * `ACCESS_COARSE_LOCATION`  Allows an app to access approximate location.
   *
   * @since 0.0.1
   */
  location: PermissionState;
}

/**
 * @since 1.0.0
 */
export type PermissionType = 'bluetooth' | 'location';

/**
 * @since 1.0.0
 */
export interface Permissions {
  permissions: PermissionType[];
}

/**
 * There are several modes for sending packets:
 *
 * - **Broadcast**
 * Sends a packet using mesh without a defined receiver. The packet is broadcast to all nearby users that are in range, who then broadcast it to all receivers that are in their range, and so on. If a user isn't in range, the packet will be delivered the next time said user comes within range of another user who did receive the packet. Broadcast messages can be read by all nodes that receive it.
 * - **Mesh**
 * Sends the packet using mesh to only once receiver. It doesn't need the receiver to be in range. Receiver can be in range of a third receiver located within range of both sender and receiver at the same time, or receiver can be out of range of all other nodes, but eventually come within range of a node that at some point received the packet. Mesh messages can be received by multiple nodes, but can only be read by the intended receiver.
 * - **P2P**
 * Sends the packet only when the receiver is in range.
 */
export interface TransmissionMode {
  type: TransmissionType;
  uuid: UUID;
}

export enum TransmissionType {
  /**
   * Propagate a message readable by every device that receives it.
   *
   * @since 1.0.0
   */
  BROADCAST = 'broadcast',

  /**
   * Deliver a message to a specific recipient using nearby devices to propagate it.
   *
   * @since 1.0.0
   */
  MESH = 'mesh',

  /**
   * Deliver a message to a specific recipient only if there's an active connection with it.
   *
   * @since 1.0.0
   */
  P2P = 'p2p',
}

export enum PropagationProfile {
  /**
   * Represents a standard propagation profile.
   *
   * @since 1.0.0
   */
  STANDARD = 'standard',
  /**
   * Indicates a propagation profile suitable for high-density networks.
   *
   * @since 1.0.0
   */
  HIGH_DENSITY_ENVIRONMENT = 'highDensityEnvironment',
  /**
   * Represents a propagation profile tailored for sparse networks.
   *
   * @since 1.0.0
   */
  SPARSE_ENVIRONMENT = 'sparseEnvironment',
  /**
   * Indicates a propagation profile optimized for long reach.
   *
   * @since 1.0.0
   */
  LONG_REACH = 'longReach',
  /**
   * Represents a propagation profile designed for short reach communication.
   *
   * @since 1.0.0
   */
  SHORT_REACH = 'shortReach',
}

export enum ReasonType {
  /**
   * The Bridgefy SDK is already running.
   *
   * @since 1.0.0
   */
  ALREADY_STARTED = 'alreadyStarted',
  /**
   * The license is expired.
   *
   * @since 1.0.0
   */
  EXPIRED_LICENSE = 'expiredLicense',
  /**
   * The device's time has been modified.
   *
   * @since 1.0.0
   */
  INCONSISTENT_DEVICE_TIME = 'inconsistentDeviceTime',
  /**
   * An internet connection is required to validate the license.
   *
   * @since 1.0.0
   */
  INTERNET_CONNECTION_REQUIRED = 'internetConnectionRequired',
  /**
   * The provided API key is invalid.
   *
   * @since 1.0.0
   */
  INVALID_API_KEY = 'invalidAPIKey',
  /**
   * An error occurred while creating the session.
   *
   * @since 1.0.0
   */
  SESSION_ERROR = 'sessionError',
  /**
   * The Bridgefy SDK cannot run in the simulator.
   *
   * @since 1.0.0
   */
  SIMULATOR_IS_NOT_SUPPORTED = 'simulatorIsNotSupported',

  // Android

  /**
   * ![Android](assets/android.svg) Only available for Android.
   *
   * @since 1.0.0
   */
  DEVICE_CAPABILITIES = 'deviceCapabilities',
  /**
   * ![Android](assets/android.svg) Only available for Android.
   *
   * @since 1.0.0
   */
  GENERIC = 'generic',
  /**
   * ![Android](assets/android.svg) Only available for Android.
   *
   * @since 1.0.0
   */
  MISSING_APPLICATION_ID = 'missingApplicationID',
  /**
   * ![Android](assets/android.svg) Only available for Android.
   *
   * @since 1.0.0
   */
  PERMISSION = 'permission',
  /**
   * ![Android](assets/android.svg) Only available for Android.
   *
   * @since 1.0.0
   */
  REGISTRATION = 'registration',
  /**
   * ![Android](assets/android.svg) Only available for Android.
   *
   * @since 1.0.0
   */
  SIZE_LIMIT_EXCEEDED = 'sizeLimitExceeded',
  /**
   * ![Android](assets/android.svg) Only available for Android.
   *
   * @since 1.0.0
   */
  UNKNOWN = 'unknown',

  // iOS

  /**
   * Cannot get app's bundle ID.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  MISSING_BUNDLE_ID = 'missingBundleID',
  /**
   * The userId passed in the start function is different from the stored one.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  INCONSISTENT_USER_ID = 'inconsistentUserID',
  /**
   * The Bridgefy SDK hasn't been started.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  NOT_STARTED = 'notStarted',
  /**
   * A Bridgefy SDK instance already exists.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  ALREADY_INSTANTIATED = 'alreadyInstantiated',
  /**
   * The Bridgefy SDK is performing the start process.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  START_IN_PROGRESS = 'startInProgress',
  /**
   * The Bridgefy SDK is performing the stop process.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  STOP_IN_PROGRESS = 'stopInProgress',
  /**
   * The Bridgefy SDK is destroying the current session.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  DESTROY_SESSION_IN_PROGRESS = 'destroySessionInProgress',
  /**
   * The Bridgefy SDK service is not started.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  SERVICE_NOT_STARTED = 'serviceNotStarted',
  /**
   * The user does not allow the use of BLE.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  BLE_USAGE_NOT_GRANTED = 'BLEUsageNotGranted',
  /**
   * The use of BLE in this device is restricted.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  BLE_USAGE_RESTRICTED = 'BLEUsageRestricted',
  /**
   * The BLE antenna has been turned off.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  BLE_POWERED_OFF = 'BLEPoweredOff',
  /**
   * The usage of BLE is not supported in the device.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  BLE_UNSUPPORTED = 'BLEUnsupported',
  /**
   * BLE usage failed with an unknown error.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  BLE_UNKNOWN_ERROR = 'BLEUnknownError',

  INCONSISTENT_CONNECTION = 'inconsistentConnection',
  CONNECTION_IS_ALREADY_SECURE = 'connectionIsAlreadySecure',
  CANNOT_CREATE_SECURE_CONNECTION = 'cannotCreateSecureConnection',

  /**
   * The length of the data exceed the maximum limit.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  DATA_LENGTH_EXCEEDED = 'dataLengthExceeded',
  /**
   * The data to send is empty.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  DATA_VALUE_IS_EMPTY = 'dataValueIsEmpty',
  /**
   * The requested peer is not connected.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  PEER_IS_NOT_CONNECTED = 'peerIsNotConnected',

  /**
   * An internal error occurred.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  INTERNAL_ERROR = 'internalError',
  /**
   * An error occurred while validating the license.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  LICENSE_ERROR = 'licenseError',
  /**
   * An error occurred while storing data.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  STORAGE_ERROR = 'storageError',
  /**
   * An error occurred while encoding the message.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  ENCODING_ERROR = 'encodingError',
  /**
   * An error occurred while encrypting the message.
   *
   * ![iOS](assets/ios.svg) Only available for iOS.
   *
   * @since 1.0.0
   */
  ENCRYPTION_ERROR = 'encryptionError',
}
