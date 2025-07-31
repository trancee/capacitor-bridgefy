/// <reference types='@capacitor/cli' />

import type { PermissionState, PluginListenerHandle } from '@capacitor/core';

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    /**
     * These configuration values are available:
     *
     * @since 0.1.0
     */
    Bridgefy?: {
      /**
       * The API key for Bridgefy.
       *
       * @example '123e4567-e89b-12d3-a456-426614174000'
       * @since 0.1.0
       */
      apiKey?: UUID;

      /**
       * If `true`, enables verbose logging for debugging purposes.
       *
       * @default false
       * @example true
       * @since 0.1.0
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
   * @since 0.1.0
   */
  initialize(options: InitializeOptions): Promise<void>;
  /**
   * Checks if the Bridgefy SDK has been initialized.
   *
   * @since 0.1.0
   */
  isInitialized(): Promise<IsInitializedResult>;

  /**
   * Starts Bridgefy operations, allowing the SDK to participate in the Bridgefy network.
   *
   * @since 0.1.0
   */
  start(options: StartOptions): Promise<void>;
  /**
   * Indicates whether the Bridgefy SDK is currently started.
   *
   * @since 0.1.0
   */
  isStarted(): Promise<IsStartedResult>;

  /**
   * Stops Bridgefy operations and releases associated resources.
   *
   * @since 0.1.0
   */
  stop(): Promise<void>;

  /**
   * License
   */

  /**
   * Retrieves the expiration date of the Bridgefy license.
   *
   * @since 0.1.0
   */
  licenseExpirationDate(): Promise<LicenseExpirationDateResult>;

  /**
   * Updates the Bridgefy license, if necessary.
   *
   * @since 0.1.0
   */
  updateLicense(): Promise<void>;

  /**
   * Session
   */

  /**
   * Destroys the current session, terminating any active connections and cleaning up resources.
   *
   * @since 0.1.0
   */
  destroySession(): Promise<void>;

  /**
   * Retrieves the `UUID` of the current Bridgefy user.
   *
   * @since 0.1.0
   */
  currentUserID(): Promise<CurrentUserIDResult>;

  /**
   * Retrieves a list of `UUID`s representing the connected peers in the current session.
   *
   * Only available for Android.
   *
   * @since 0.1.0
   */
  connectedPeers(): Promise<ConnectedPeersResult>;

  /**
   * Secure Connection
   */

  /**
   * Establishes a secure connection with the user.
   *
   * @since 0.1.0
   */
  establishSecureConnection(options: EstablishSecureConnectionOptions): Promise<void>;

  /**
   * Generates a fingerprint for the secure connection established with a specified user.
   *
   * Only available for Android.
   *
   * @since 0.1.0
   */
  fingerprint(options: FingerprintOptions): Promise<FingerprintResult>;

  /**
   * Verifies the validity of a fingerprint for a particular user.
   *
   * Only available for Android.
   *
   * @since 0.1.0
   */
  isFingerprintValid(options: IsFingerprintValidOptions): Promise<IsFingerprintValidResult>;

  /**
   * Payload
   */

  /**
   * Sends data using a specific transmission mode.
   *
   * @since 0.1.0
   */
  send(options: SendOptions): Promise<SendResult>;

  /**
   * Permissions
   */

  /**
   * Check for the appropriate permissions to use Nearby.
   *
   * @since 0.1.0
   */
  checkPermissions(): Promise<PermissionStatus>;
  /**
   * Request the appropriate permissions to use Nearby.
   *
   * @since 0.1.0
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
   * When a peer has established connection
   *
   * @param {PeerID} peerID Identifier of the peer that has established a connection.
   */
  addListener(eventName: 'onConnected', listenerFunc: OnConnectedListener): Promise<PluginListenerHandle>;
  /**
   * When a peer is disconnected (out of range)
   *
   * @param {PeerID} peerID Identifier of the disconnected peer.
   */
  addListener(eventName: 'onDisconnected', listenerFunc: OnDisconnectedListener): Promise<PluginListenerHandle>;
  /**
   * When a device is detected, notifies the list of connected users
   *
   * Only available for Android.
   *
   * @param {PeerID[]} connectedPeers List of identifiers of the connected peers.
   */
  addListener(eventName: 'onConnectedPeers', listenerFunc: OnConnectedPeersListener): Promise<PluginListenerHandle>;

  /**
   * When an on-demand secure connection was successfully established
   *
   * @param {UserID} userID Identifier of the user with whom the secure connection is established.
   */
  addListener(
    eventName: 'onEstablishSecureConnection',
    listenerFunc: OnEstablishSecureConnectionListener,
  ): Promise<PluginListenerHandle>;
  /**
   * When an on-demand secure connection failed to establish
   *
   * @param {UserID} userID Identifier of the user with whom the secure connection was attempted.
   * @param {Exception} error The error that occurred during the connection attempt.
   */
  addListener(
    eventName: 'onFailToEstablishSecureConnection',
    listenerFunc: OnFailToEstablishSecureConnectionListener,
  ): Promise<PluginListenerHandle>;

  /**
   * Transmission Listeners
   */

  /**
   * When a message is sent
   *
   * @param {MessageID} messageID Identifier of the sent message.
   */
  addListener(eventName: 'onSend', listenerFunc: OnSendListener): Promise<PluginListenerHandle>;
  /**
   * When a message fails to send
   *
   * @param {MessageID} messageID Identifier of the failed message.
   */
  addListener(eventName: 'onFailToSend', listenerFunc: OnFailToSendListener): Promise<PluginListenerHandle>;
  /**
   * When sending progress update
   *
   * Only available for Android.
   *
   * @param {MessageID} messageID Identifier of the message being sent.
   * @param {number} position Current position of the message being sent.
   * @param {number} total Total size of the message being sent.
   */
  addListener(eventName: 'onProgressOfSend', listenerFunc: OnProgressOfSendListener): Promise<PluginListenerHandle>;
  /**
   * When data is received
   *
   * @param {MessageID} messageID Identifier of the received message.
   * @param {Base64} data The received data, encoded as a `Base64` string.
   * @param {TransmissionMode} transmissionMode The transmission mode used when sending the message.
   */
  addListener(eventName: 'onReceiveData', listenerFunc: OnReceiveDataListener): Promise<PluginListenerHandle>;

  /**
   * Remove all listeners for this plugin.
   *
   * @since 0.1.0
   */
  removeAllListeners(): Promise<void>;
}

export type OnStartedListener = (event: OnStartedEvent) => void;
export interface OnStartedEvent {
  userID: UserID;
}
export type OnFailToStartListener = (event: OnFailToStartEvent) => void;
export interface OnFailToStartEvent {
  reason: Reason;
}
export type OnFailToStopListener = (event: OnFailToStopEvent) => void;
export interface OnFailToStopEvent {
  reason: Reason;
}
export type OnFailToDestroySessionListener = (event: OnFailToDestroySessionEvent) => void;
export interface OnFailToDestroySessionEvent {
  reason: Reason;
}

export type OnConnectedListener = (event: OnConnectedEvent) => void;
export interface OnConnectedEvent {
  peerID: PeerID;
}
export type OnDisconnectedListener = (event: OnDisconnectedEvent) => void;
export interface OnDisconnectedEvent {
  peerID: PeerID;
}
export type OnConnectedPeersListener = (event: OnConnectedPeersEvent) => void;
export interface OnConnectedPeersEvent {
  connectedPeers: PeerID[];
}

export type OnEstablishSecureConnectionListener = (event: OnEstablishSecureConnectionEvent) => void;
export interface OnEstablishSecureConnectionEvent {
  userID: UserID;
}
export type OnFailToEstablishSecureConnectionListener = (event: OnFailToEstablishSecureConnectionEvent) => void;
export interface OnFailToEstablishSecureConnectionEvent {
  userID: UserID;
  reason: Reason;
}

export type OnSendListener = (event: OnSendEvent) => void;
export interface OnSendEvent {
  messageID: MessageID;
}
export type OnFailToSendListener = (event: OnFailToSendEvent) => void;
export interface OnFailToSendEvent {
  messageID: MessageID;
  reason: Reason;
}
export type OnProgressOfSendListener = (event: OnProgressOfSendEvent) => void;
export interface OnProgressOfSendEvent {
  messageID: MessageID;
  position: number;
  total: number;
}
export type OnReceiveDataListener = (event: OnReceiveDataEvent) => void;
export interface OnReceiveDataEvent {
  messageID: MessageID;
  data: Base64;
  transmissionMode: TransmissionMode;
}

/**
 * @since 0.1.0
 */
export interface InitializeOptions {
  /**
   * The API key for Bridgefy.
   */
  apiKey?: UUID;

  /**
   * If `true`, enables verbose logging for debugging purposes.
   */
  verboseLogging?: boolean;
}

/**
 * @since 0.1.0
 */
export interface IsInitializedResult {
  isInitialized?: boolean;
}

/**
 * @since 0.1.0
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
 * @since 0.1.0
 */
export interface IsStartedResult {
  isStarted?: boolean;
}

/**
 * The time in milliseconds that has elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC (equivalent to the UNIX epoch).
 * This timestamp is timezone-agnostic and uniquely defines an instant in history.
 *
 * @since 0.1.0
 */
export type Timestamp = number;

/**
 * @since 0.1.0
 */
export interface LicenseExpirationDateResult {
  /**
   * The expiration date of the license.
   *
   * @since 0.1.0
   */
  licenseExpirationDate?: Timestamp;
}

/**
 * @since 0.1.0
 */
export interface CurrentUserIDResult {
  userID?: UserID;
}

/**
 * @since 0.1.0
 */
export interface ConnectedPeersResult {
  peers?: PeerID[];
}

/**
 * @since 0.1.0
 */
export interface SendOptions {
  data: Base64;
  transmissionMode: TransmissionMode;
}

/**
 * @since 0.1.0
 */
export interface SendResult {
  messageID: MessageID;
}

/**
 * @since 0.1.0
 */
export interface EstablishSecureConnectionOptions {
  userID: UserID;
}

/**
 * @since 0.1.0
 */
export interface FingerprintOptions {
  userID: UserID;
}
/**
 * @since 0.1.0
 */
export interface FingerprintResult {
  fingerprint?: Base64;
}

/**
 * @since 0.1.0
 */
export interface IsFingerprintValidOptions {
  userID: UserID;
  fingerprint: Base64;
}
/**
 * @since 0.1.0
 */
export interface IsFingerprintValidResult {
  isValid: boolean;
}

/**
 * @since 0.1.0
 */
export interface Reason {
  type: ReasonType;
  message?: string;
  code?: number;
}

/**
 * @since 0.1.0
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
 * @since 0.1.0
 */
export type PermissionType = 'bluetooth' | 'location';

/**
 * @since 0.1.0
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
   * @since 0.1.0
   */
  BROADCAST = 'broadcast',

  /**
   * Deliver a message to a specific recipient using nearby devices to propagate it.
   *
   * @since 0.1.0
   */
  MESH = 'mesh',

  /**
   * Deliver a message to a specific recipient only if there's an active connection with it.
   *
   * @since 0.1.0
   */
  P2P = 'p2p',
}

export enum PropagationProfile {
  /**
   * Represents a standard propagation profile.
   *
   * @since 0.1.0
   */
  STANDARD = 'standard',
  /**
   * Indicates a propagation profile suitable for high-density networks.
   *
   * @since 0.1.0
   */
  HIGH_DENSITY_ENVIRONMENT = 'highDensityEnvironment',
  /**
   * Represents a propagation profile tailored for sparse networks.
   *
   * @since 0.1.0
   */
  SPARSE_ENVIRONMENT = 'sparseEnvironment',
  /**
   * Indicates a propagation profile optimized for long reach.
   *
   * @since 0.1.0
   */
  LONG_REACH = 'longReach',
  /**
   * Represents a propagation profile designed for short reach communication.
   *
   * @since 0.1.0
   */
  SHORT_REACH = 'shortReach',
}

export enum ReasonType {
  /**
   * The Bridgefy SDK is already running.
   *
   * @since 0.1.0
   */
  ALREADY_STARTED = 'alreadyStarted',
  /**
   * The license is expired.
   *
   * @since 0.1.0
   */
  EXPIRED_LICENSE = 'expiredLicense',
  /**
   * The device's time has been modified.
   *
   * @since 0.1.0
   */
  INCONSISTENT_DEVICE_TIME = 'inconsistentDeviceTime',
  /**
   * An internet connection is required to validate the license.
   *
   * @since 0.1.0
   */
  INTERNET_CONNECTION_REQUIRED = 'internetConnectionRequired',
  /**
   * The provided API key is invalid.
   *
   * @since 0.1.0
   */
  INVALID_API_KEY = 'invalidAPIKey',
  /**
   * An error occurred while creating the session.
   *
   * @since 0.1.0
   */
  SESSION_ERROR = 'sessionError',
  /**
   * The Bridgefy SDK cannot run in the simulator.
   *
   * @since 0.1.0
   */
  SIMULATOR_IS_NOT_SUPPORTED = 'simulatorIsNotSupported',

  // Android

  /**
   * Only available for Android.
   *
   * @since 0.1.0
   */
  DEVICE_CAPABILITIES = 'deviceCapabilities',
  /**
   * Only available for Android.
   *
   * @since 0.1.0
   */
  GENERIC = 'generic',
  /**
   * Only available for Android.
   *
   * @since 0.1.0
   */
  MISSING_APPLICATION_ID = 'missingApplicationID',
  /**
   * Only available for Android.
   *
   * @since 0.1.0
   */
  PERMISSION = 'permission',
  /**
   * Only available for Android.
   *
   * @since 0.1.0
   */
  REGISTRATION = 'registration',
  /**
   * Only available for Android.
   *
   * @since 0.1.0
   */
  SIZE_LIMIT_EXCEEDED = 'sizeLimitExceeded',
  /**
   * Only available for Android.
   *
   * @since 0.1.0
   */
  UNKNOWN = 'unknown',

  // iOS

  /**
   * Cannot get app's bundle ID.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  MISSING_BUNDLE_ID = 'missingBundleID',
  /**
   * The userId passed in the start function is different from the stored one.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  INCONSISTENT_USER_ID = 'inconsistentUserId',
  /**
   * The Bridgefy SDK hasn't been started.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  NOT_STARTED = 'notStarted',
  /**
   * A Bridgefy SDK instance already exists.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  ALREADY_INSTANTIATED = 'alreadyInstantiated',
  /**
   * The Bridgefy SDK is performing the start process.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  START_IN_PROGRESS = 'startInProgress',
  /**
   * The Bridgefy SDK is performing the stop process.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  STOP_IN_PROGRESS = 'stopInProgress',
  /**
   * The Bridgefy SDK is destroying the current session.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  DESTROY_SESSION_IN_PROGRESS = 'destroySessionInProgress',
  /**
   * The Bridgefy SDK service is not started.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  SERVICE_NOT_STARTED = 'serviceNotStarted',
  /**
   * The user does not allow the use of BLE.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  BLE_USAGE_NOT_GRANTED = 'BLEUsageNotGranted',
  /**
   * The use of BLE in this device is restricted.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  BLE_USAGE_RESTRICTED = 'BLEUsageRestricted',
  /**
   * The BLE antenna has been turned off.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  BLE_POWERED_OFF = 'BLEPoweredOff',
  /**
   * The usage of BLE is not supported in the device.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  BLE_UNSUPPORTED = 'BLEUnsupported',
  /**
   * BLE usage failed with an unknown error.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  BLE_UNKNOWN_ERROR = 'BLEUnknownError',
  INCONSISTENT_CONNECTION = 'inconsistentConnection',
  CONNECTION_IS_ALREADY_SECURE = 'connectionIsAlreadySecure',
  CANNOT_CREATE_SECURE_CONNECTION = 'cannotCreateSecureConnection',
  /**
   * The length of the data exceed the maximum limit.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  DATA_LENGTH_EXCEEDED = 'dataLengthExceeded',
  /**
   * The data to send is empty.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  DATA_VALUE_IS_EMPTY = 'dataValueIsEmpty',
  /**
   * The requested peer is not connected.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  PEER_IS_NOT_CONNECTED = 'peerIsNotConnected',

  /**
   * An internal error occurred.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  INTERNAL_ERROR = 'internalError',
  /**
   * An error occurred while validating the license.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  LICENSE_ERROR = 'licenseError',
  /**
   * An error occurred while storing data.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  STORAGE_ERROR = 'storageError',
  /**
   * An error occurred while encoding the message.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  ENCODING_ERROR = 'encodingError',
  /**
   * An error occurred while encrypting the message.
   *
   * Only available for iOS.
   *
   * @since 0.1.0
   */
  ENCRYPTION_ERROR = 'encryptionError',
}
