/// <reference types="@capacitor/cli" />

import type { PermissionState, PluginListenerHandle } from '@capacitor/core';

declare module '@capacitor/cli' {
  export interface PluginsConfig {
    /**
     * These configuration values are available:
     */
    Bridgefy?: {
      /**
       * The API key for Bridgefy.
       *
       * @since 0.0.1
       * @example "123e4567-e89b-12d3-a456-426614174000"
       */
      apiKey?: UUID;

      /**
       * If true, enables verbose logging for debugging purposes.
       *
       * Defaults to `false`.
       *
       * @since 0.0.1
       * @default false
       * @example true
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
export type PeerIDs = PeerID[];
export type MessageID = UUID;

export enum TransmissionType {
  /**
   * Broadcast type propagate message on mesh network
   */
  BROADCAST = 'broadcast',

  /**
   * Mesh type propagate message and find receiver on mesh network
   */
  MESH = 'mesh',

  /**
   * Direct type allow direct message and if receiver isn't connected,
   * the SDK change and propagate message with Mesh type
   */
  P2P = 'p2p',
}

/**
 * There are several modes for sending packets:
 *
 * **Broadcast**: Sends a packet using mesh without a defined receiver. The packet is broadcast to all nearby users that are in range, who then broadcast it to all receivers that are in their range, and so on. If a user isn't in range, the packet will be delivered the next time said user comes within range of another user who did receive the packet. Broadcast messages can be read by all nodes that receive it.
 * **Mesh**: Sends the packet using mesh to only once receiver. It doesn't need the receiver to be in range. Receiver can be in range of a third receiver located within range of both sender and receiver at the same time, or receiver can be out of range of all other nodes, but eventually come within range of a node that at some point received the packet. Mesh messages can be received by multiple nodes, but can only be read by the intended receiver.
 * **P2P**: Sends the packet only when the receiver is in range.
 */
export type TransmissionMode =
  | {
      type: TransmissionType.BROADCAST;

      uuid: UUID;
    }
  | {
      type: TransmissionType.MESH;

      uuid: UUID;
    }
  | {
      type: TransmissionType.P2P;

      uuid: UUID;
    };

export enum PropagationProfile {
  STANDARD = 'standard',
  HIGH_DENSITY_ENVIRONMENT = 'highDensityEnvironment',
  SPARSE_ENVIRONMENT = 'sparseEnvironment',
  LONG_REACH = 'longReach',
  SHORT_REACH = 'shortReach',
}

export enum ExceptionType {
  ALREADY_STARTED = 'alreadyStarted',
  DEVICE_CAPABILITIES = 'deviceCapabilities',
  EXPIRED_LICENSE = 'expiredLicense',
  GENERIC = 'generic',
  INCONSISTENT_DEVICE_TIME = 'inconsistentDeviceTime',
  INTERNET_CONNECTION_REQUIRED = 'internetConnectionRequired',
  INVALID_API_KEY_FORMAT = 'invalidAPIKeyFormat',
  MISSING_APPLICATION_ID = 'missingApplicationID',
  PERMISSION = 'permission',
  REGISTRATION = 'registration',
  SESSION_ERROR = 'sessionError',
  SIMULATOR_IS_NOT_SUPPORTED = 'simulatorIsNotSupported',
  SIZE_LIMIT_EXCEEDED = 'sizeLimitExceeded',
  UNKNOWN = 'unknown',
}

export interface InitializeOptions {
  /**
   * The API key for Bridgefy.
   */
  apiKey: UUID;

  /**
   * If true, enables verbose logging for debugging purposes.
   *
   * Defaults to `false`.
   */
  verboseLogging?: boolean;
}

export interface IsInitializedResult {
  isInitialized?: boolean;
}

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
   * Defaults to `PropagationProfile.DEFAULT`.
   */
  propagationProfile?: PropagationProfile;
}

export interface IsStartedResult {
  isStarted?: boolean;
}

export interface LicenseExpirationDateResult {
  licenseExpirationDate?: string;
}

export interface UserIDResult {
  userID: UserID;
}

export interface ConnectedPeersResult {
  peers: PeerIDs;
}

export interface SendOptions {
  data: Base64;
  transmissionMode: TransmissionMode;
}

export interface SendResult {
  messageID: MessageID;
}

export interface EstablishSecureConnectionOptions {
  userID: UserID;
}

export interface FingerprintOptions {
  userID: UserID;
}
export interface FingerprintResult {
  fingerprint: Base64;
}

export interface IsFingerprintValidOptions {
  userID: UserID;
  fingerprint: Base64;
}
export interface IsFingerprintValidResult {
  isValid: boolean;
}

export interface BridgefyException {
  type: ExceptionType;
  message: string;
}

export interface PermissionStatus {
  /**
   * `BLUETOOTH_ADVERTISE` Required to be able to advertise to nearby Bluetooth devices.
   * `BLUETOOTH_CONNECT` Required to be able to connect to paired Bluetooth devices.
   * `BLUETOOTH_SCAN` Required to be able to discover and pair nearby Bluetooth devices.
   *
   * `BLUETOOTH` Allows applications to connect to paired bluetooth devices.
   * `BLUETOOTH_ADMIN` Allows applications to discover and pair bluetooth devices.
   *
   * @since 0.0.1
   */
  bluetooth: PermissionState;
  /**
   * `ACCESS_FINE_LOCATION` Allows an app to access precise location.
   *
   * `ACCESS_COARSE_LOCATION` Allows an app to access approximate location.
   *
   * @since 0.0.1
   */
  location: PermissionState;
}

export type BridgefyPermissionType = 'bluetooth' | 'location';

export interface BridgefyPermissions {
  permissions: BridgefyPermissionType[];
}

export interface BridgefyPlugin {
  /**
   * Initialization
   */

  /**
   * Initializes Bridgefy operations.
   *
   * An Internet connection is needed at least for the first time in order to validate the license.
   *
   * This method is asynchronous and returns a promise that resolves when the initialization is complete.
   *
   * @param options - The parameters to pass into this method.
   * @property {UUID} apiKey - The API key for Bridgefy.
   * @property {boolean} [verboseLogging] - If true, enables verbose logging for debugging purposes. Defaults to false.
   * @returns A promise that resolves when the initialization is complete.
   * @throws {Error} If the API key is not provided or is in an invalid
   */
  initialize(options: InitializeOptions): Promise<void>;
  /**
   * Checks if the Bridgefy SDK has been initialized.
   *
   * @return A promise that resolves with a boolean indicating whether the SDK is initialized.
   */
  isInitialized(): Promise<IsInitializedResult>;

  /**
   * Starts Bridgefy operations, allowing the SDK to participate in the Bridgefy network.
   *
   * @param options - The parameters to pass into this method.
   * @property {UserID} [userID] - The ID used to identify the user in the Bridgefy network. If not provided, a new user ID will be generated.
   * @property {PropagationProfile} [propagationProfile] - A profile that defines a series of properties and rules for the propagation of messages. Defaults to `PropagationProfile.DEFAULT`.
   */
  start(options: StartOptions): Promise<void>;
  /**
   * Indicates whether the Bridgefy SDK is currently started.
   *
   * @return A promise that resolves with a boolean indicating whether the SDK is started.
   */
  isStarted(): Promise<IsStartedResult>;

  /**
   * Stops Bridgefy operations and releases associated resources.
   */
  stop(): Promise<void>;

  /**
   * License
   */

  /**
   * Retrieves the expiration date of the Bridgefy license.
   *
   * @returns A promise that resolves with an object containing the license expiration date.
   * If the license is valid, the `expirationDate` property will be a string representing the date in ISO format. If the license is not valid or has expired, the `expirationDate` property will be undefined.
   */
  licenseExpirationDate(): Promise<LicenseExpirationDateResult>;

  /**
   * Updates the Bridgefy license, if necessary.
   */
  updateLicense(): Promise<void>;

  /**
   * Session
   */

  /**
   * Destroys the current session, terminating any active connections and cleaning up resources.
   *
   * @returns A promise that resolves when the session is destroyed.
   */
  destroySession(): Promise<void>;

  /**
   * Retrieves the UUID of the current Bridgefy user.
   *
   * @returns A promise that resolves with an object containing the user ID or rejects if the user ID cannot be retrieved.
   */
  currentUserID(): Promise<UserIDResult>;

  /**
   * Retrieves a list of UUIDs representing the connected peers in the current session.
   *
   * @returns A promise that resolves with an object containing a list of UUIDs representing the connected peers.
   */
  connectedPeers(): Promise<ConnectedPeersResult>;

  /**
   * Secure Connection
   */

  /**
   * Establishes a secure connection with the user.
   *
   * @param options The parameters to pass into this method.
   * @property {UserID} [userID] The UUID of the user to establish a secure connection with.
   */
  establishSecureConnection(options: EstablishSecureConnectionOptions): Promise<void>;

  /**
   * Generates a fingerprint for the secure connection established with a specified user.
   *
   * @param options The parameters to pass into this method.
   * @property {UserID} [userID] The UUID of the user for whom the fingerprint should be generated.
   * @returns A promise that resolves with an object containing the fingerprint of the user, encoded as a Base64 string.
   * @throws {Error} If a secure connection hasn't been established with the user, the promise will be rejected with an error message.
   */
  fingerprint(options: FingerprintOptions): Promise<FingerprintResult>;

  /**
   * Verifies the validity of a fingerprint for a particular user.
   *
   * @param options The parameters to pass into this method.
   * @property {UserID} [userID] The UUID of the user whose fingerprint is being verified.
   * @property {Base64} fingerprint The fingerprint data to be verified, encoded as a Base64 string.
   * @returns A promise that resolves with an object containing if the provided fingerprint data is valid.
   */
  isFingerprintValid(options: IsFingerprintValidOptions): Promise<IsFingerprintValidResult>;

  /**
   * Payload
   */

  /**
   * Sends data using a specific transmission mode.
   *
   * @param options - The parameters to pass into this method.
   * @property {Base64} data - The data to be sent, encoded as a Base64 string.
   * @property {TransmissionMode} transmissionMode - The mode of transmission for the data.
   * @returns A promise that resolves with an object containing the message ID of the sent data.
   * @throws {Error} If there is an error during the sending process, the promise will be rejected with an error message.
   */
  send(options: SendOptions): Promise<SendResult>;

  /**
   * Permissions
   */

  /**
   * Check for the appropriate permissions to use Nearby.
   *
   * @since 0.0.1
   */
  checkPermissions(): Promise<PermissionStatus>;
  /**
   * Request the appropriate permissions to use Nearby.
   *
   * @since 0.0.1
   */
  requestPermissions(permissions?: BridgefyPermissions): Promise<PermissionStatus>;

  /**
   * Initialization Listeners
   */
  addListener(eventName: 'onStarted', listenerFunc: (userID: UserID) => void): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'onFailToStart',
    listenerFunc: (exception: BridgefyException) => void,
  ): Promise<PluginListenerHandle>;
  addListener(eventName: 'onStopped', listenerFunc: () => void): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'onFailToStop',
    listenerFunc: (exception: BridgefyException) => void,
  ): Promise<PluginListenerHandle>;
  addListener(eventName: 'onDestroySession', listenerFunc: () => void): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'onFailToDestroySession',
    listenerFunc: (exception: BridgefyException) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Connectivity Listeners
   */

  /**
   * When a peer has established connection
   *
   * @param {PeerID} peerID - Identifier of the peer that has established a connection.
   */
  addListener(eventName: 'onConnected', listenerFunc: (peerID: PeerID) => void): Promise<PluginListenerHandle>;
  /**
   * When a peer is disconnected (out of range)
   *
   * @param {PeerID} peerID - Identifier of the disconnected peer.
   */
  addListener(eventName: 'onDisconnected', listenerFunc: (peerID: PeerID) => void): Promise<PluginListenerHandle>;
  /**
   * When a device is detected, notifies the list of connected users
   *
   * @param {PeerIDs} connectedPeers - List of identifiers of the connected peers.
   */
  addListener(
    eventName: 'onConnectedPeers',
    listenerFunc: (connectedPeers: PeerIDs) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * When an on-demand secure connection was successfully established
   *
   * @param {UserID} userID - Identifier of the user with whom the secure connection is established.
   */
  addListener(
    eventName: 'onEstablishSecureConnection',
    listenerFunc: (userID: UserID) => void,
  ): Promise<PluginListenerHandle>;
  /**
   * When an on-demand secure connection failed to establish
   *
   * @param {UserID} userID - Identifier of the user with whom the secure connection was attempted.
   * @param {Exception} error - The error that occurred during the connection attempt.
   */
  addListener(
    eventName: 'onFailToEstablishSecureConnection',
    listenerFunc: (userID: UserID, exception: BridgefyException) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Transmission Listeners
   */

  /**
   * When a message is sent
   *
   * @param {MessageID} messageID - Identifier of the sent message.
   */
  addListener(eventName: 'onSend', listenerFunc: (messageID: MessageID) => void): Promise<PluginListenerHandle>;
  /**
   * When a message fails to send
   *
   * @param {MessageID} messageID - Identifier of the failed message.
   */
  addListener(
    eventName: 'onFailToSend',
    listenerFunc: (messageID: MessageID, exception: BridgefyException) => void,
  ): Promise<PluginListenerHandle>;
  addListener(
    eventName: 'onProgressOfSend',
    listenerFunc: (messageID: MessageID, position: number, total: number) => void,
  ): Promise<PluginListenerHandle>;
  /**
   * When data is received
   *
   * @param {MessageID} messageID - Identifier of the received message.
   * @param {Base64} data - The received data, encoded as a Base64 string.
   * @param {TransmissionMode} transmissionMode - The transmission mode used when sending the message.
   */
  addListener(
    eventName: 'onReceiveData',
    listenerFunc: (messageID: MessageID, data: Base64, transmissionMode: TransmissionMode) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Removes all listeners
   */
  removeAllListeners(): Promise<void>;
}
