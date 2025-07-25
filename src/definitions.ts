import type { PluginListenerHandle } from '@capacitor/core';

export type Base64 = string & { readonly __brand: unique symbol };
export function isBase64(value: string): value is Base64 {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(value);
}
export function Base64(value: string): Base64 {
  return isBase64(value) ? value as Base64 : (undefined as never);
}

export type UUID = string & { readonly __brand: unique symbol };
export function isUUID(value: string): value is UUID {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
export function UUID(value: string): UUID {
  return isUUID(value) ? value as UUID : (undefined as never);
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
export type TransmissionMode = {
  type: TransmissionType.BROADCAST,

  senderID: UUID;
} | {
  type: TransmissionType.MESH,

  receiverID: UUID;
} | {
  type: TransmissionType.P2P,

  receiverID: UUID;
};

export enum PropagationProfile {
  STANDARD = 'standard',
  HIGH_DENSITY_ENVIRONMENT = 'highDensityEnvironment',
  SPARSE_ENVIRONMENT = 'sparseEnvironment',
  LONG_REACH = 'longReach',
  SHORT_REACH = 'shortReach',
}

export enum BridgefyException {
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
  apiKey: UUID

  /**
   * If true, enables verbose logging for debugging purposes. 
   * 
   * Defaults to `false`.
   */
  verboseLogging?: boolean
}

export interface StartOptions {
  /**
   * The ID used to identify the user in the Bridgefy network. 
   * 
   * If not provided, a new user ID will be generated.
   */
  userID?: UserID

  /**
   * A profile that defines a series of properties and rules for the propagation of messages. 
   * 
   * Defaults to `PropagationProfile.DEFAULT`.
   */
  propagationProfile?: PropagationProfile
}

export interface ExpirationDateResult {
  expirationDate?: string
}

// export interface UserIDResult {
//   userID: UserID
// }

// export interface ConnectedPeersResult {
//   peers: PeerIDs
// }

export interface SendOptions {
  data: Base64
  transmissionMode: TransmissionMode
}

// export interface SendResult {
//   messageID: MessageID
// }

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
   * @returns A promise that resolves when the initialization is complete, or rejects if there is an error during initialization.
   */
  initialize(options: InitializeOptions): Promise<void>;
  /**
   * Checks if the Bridgefy SDK has been initialized.
   * 
   * @return A promise that resolves with a boolean indicating whether the SDK is initialized.
   */
  isInitialized(): Promise<boolean>;

  /**
   * Stops Bridgefy operations and releases associated resources.
   */
  stop(): Promise<void>;

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
  isStarted(): Promise<boolean>;

  /**
   * License
   */

  /**
   * Retrieves the expiration date of the Bridgefy license.
   * 
   * @returns A promise that resolves with an object containing the license expiration date.
   * If the license is valid, the `expirationDate` property will be a string representing the date in ISO format. If the license is not valid or has expired, the `expirationDate` property will be undefined.
   */
  licenseExpirationDate(): Promise<ExpirationDateResult>;

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
  currentUserID(): Promise<UserID>;

  /**
   * Connection
   */

  /**
   * Retrieves a list of UUIDs representing the connected peers in the current session.
   * 
   * @returns A promise that resolves with an object containing a list of UUIDs representing the connected peers.
   */
  connectedPeers(): Promise<PeerIDs>;

  /**
   * Data
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
  send(options: SendOptions): Promise<MessageID>;

  /**
   * Initialization Listeners
   */
  addListener(eventName: 'onFailToStart', listenerFunc: (error: BridgefyException) => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onStarted', listenerFunc: (userID: UserID) => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onFailToStop', listenerFunc: (error: BridgefyException) => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onStopped', listenerFunc: () => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onDestroySession', listenerFunc: () => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onFailToDestroySession', listenerFunc: (error: BridgefyException) => void): Promise<PluginListenerHandle>;

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
  addListener(eventName: 'onConnectedPeers', listenerFunc: (connectedPeers: PeerIDs) => void): Promise<PluginListenerHandle>;

  /**
   * When an on-demand secure connection was successfully established
   * 
   * @param {UserID} userID - Identifier of the user with whom the secure connection is established.
   */
  addListener(eventName: 'onEstablishSecureConnection', listenerFunc: (userID: UserID) => void): Promise<PluginListenerHandle>;
  /**
   * When an on-demand secure connection failed to establish
   * 
   * @param {UserID} userID - Identifier of the user with whom the secure connection was attempted.
   * @param {Exception} error - The error that occurred during the connection attempt.
   */
  addListener(eventName: 'onFailToEstablishSecureConnection', listenerFunc: (userID: UserID, error: BridgefyException) => void): Promise<PluginListenerHandle>;

  /**
   * Transmission Listeners
   */

  /**
   * When a message is sent
   * 
   * @param {MessageID} messageID - Identifier of the sent message.
   */
  addListener(eventName: 'onSend', listenerFunc: (messageID: MessageID) => void): Promise<PluginListenerHandle>;
  addListener(eventName: 'onProgressOfSend', listenerFunc: (messageID: MessageID, position: number, total: number) => void): Promise<PluginListenerHandle>;
  /**
   * When a message fails to send
   * 
   * @param {MessageID} messageID - Identifier of the failed message.
   */
  addListener(eventName: 'onFailToSend', listenerFunc: (messageID: MessageID, error: BridgefyException) => void): Promise<PluginListenerHandle>;
  /**
   * When data is received
   * 
   * @param {Base64} data - The received data, encoded as a Base64 string.
   * @param {MessageID} messageID - Identifier of the received message.
   * @param {TransmissionMode} transmissionMode - The transmission mode used when sending the message.
   */
  addListener(eventName: 'onReceiveData', listenerFunc: (data: Base64, messageID: MessageID, transmissionMode: TransmissionMode) => void): Promise<PluginListenerHandle>;

  /**
   * Removes all listeners
   */
  removeAllListeners(): Promise<void>;
}
