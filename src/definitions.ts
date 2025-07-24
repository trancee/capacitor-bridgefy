import type { PluginListenerHandle } from '@capacitor/core';

export type UUID = string;

export enum PropagationProfile {
  DEFAULT = 'default',
}

/**
 * There are several modes for sending packets:
 * 
 * **Broadcast**: Sends a packet using mesh without a defined receiver. The packet is broadcast to all nearby users that are in range, who then broadcast it to all receivers that are in their range, and so on. If a user isn't in range, the packet will be delivered the next time said user comes within range of another user who did receive the packet. Broadcast messages can be read by all nodes that receive it.
 * **Mesh(val receiver: String)**: Sends the packet using mesh to only once receiver. It doesn't need the receiver to be in range. Receiver can be in range of a third receiver located within range of both sender and receiver at the same time, or receiver can be out of range of all other nodes, but eventually come within range of a node that at some point received the packet. Mesh messages can be received by multiple nodes, but can only be read by the intended receiver.
 * **P2P(val receiver: String)**: Sends the packet only when the receiver is in range.
 */
export enum TransmissionMode {
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

export enum PropagationProfile {
  Standard,
  HighDensityEnvironment,
  SparseEnvironment,
  LongReach,
  ShortReach,
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
  userId?: UUID

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

export interface UserIdResult {
  userId: UUID
}

export interface ConnectedPeersResult {
  peers: UUID[]
}

export interface SendOptions {
  data: Base64URLString
  transmissionMode: TransmissionMode
}

export interface SendResult {
  messageId: UUID
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
   * @returns A promise that resolves when the initialization is complete, or rejects if there is an error during initialization.
   */
  initialize(options: InitializeOptions): Promise<void>;

  /**
   * Stops Bridgefy operations and releases associated resources.
   */
  stop(): Promise<void>;

  /**
   * Starts Bridgefy operations, allowing the SDK to participate in the Bridgefy network.
   * 
   * @param options - The parameters to pass into this method.
   * @property {UUID} [userId] - The ID used to identify the user in the Bridgefy network. If not provided, a new user ID will be generated.
   * @property {PropagationProfile} [propagationProfile] - A profile that defines a series of properties and rules for the propagation of messages. Defaults to `PropagationProfile.DEFAULT`.
   */
  start(options: StartOptions): Promise<void>;

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
   * Indicates whether the Bridgefy SDK is currently started.
   * 
   * @return A promise that resolves with a boolean indicating whether the SDK is started.
   */
  isStarted(): Promise<boolean>;

  /**
   * Retrieves the UUID of the current Bridgefy user.
   * 
   * @returns A promise that resolves with an object containing the user ID or rejects if the user ID cannot be retrieved.
   */
  currentUserId(): Promise<UserIdResult>;

  /**
   * Connection
   */

  /**
   * Retrieves a list of UUIDs representing the connected peers in the current session.
   * 
   * @returns A promise that resolves with an object containing a list of UUIDs representing the connected peers.
   */
  connectedPeers(): Promise<ConnectedPeersResult>;

  /**
   * Data
   */

  /**
   * Sends data using a specific transmission mode.
   * 
   * @param options - The parameters to pass into this method.
   * @property {Base64URLString} data - The data to be sent, encoded as a Base64 URL string.
   * @property {TransmissionMode} transmissionMode - The mode of transmission for the data. It can be one of the following:
   * - `TransmissionMode.BROADCAST`: Broadcasts the data to all nearby users in the Bridgefy network.
   * - `TransmissionMode.MESH`: Sends the data to a specific receiver using the mesh network, allowing for delivery even if the receiver is not currently in range.
   * - `TransmissionMode.P2P`: Sends the data directly to a specific receiver when they are in range. If the receiver is not currently connected, the SDK will automatically switch to using
   * @returns A promise that resolves with an object containing the message ID of the sent data.
   * @throws {Error} If there is an error during the sending process, the promise will be rejected with an error message.
   */
  send(options: SendOptions): Promise<SendResult>;

  /**
   * When a peer has established connection
   * 
   * @param {UUID} peerID - Identifier of the peer that has established a connection.
   */
  addListener(eventName: 'onConnected', listenerFunc: (peerID: UUID) => void): Promise<PluginListenerHandle>;
  /**
   * When a peer is disconnected (out of range)
   * 
   * @param {UUID} peerID - Identifier of the disconnected peer.
   */
  addListener(eventName: 'onDisconnected', listenerFunc: (peerID: UUID) => void): Promise<PluginListenerHandle>;
  /**
   * When a device is detected, notifies the list of connected users
   * 
   * @param {UUID[]} connectedPeers - List of identifiers of the connected peers.
   */
  addListener(eventName: 'onConnectedPeers', listenerFunc: (connectedPeers: UUID[]) => void): Promise<PluginListenerHandle>;

  /**
   * When a message is sent
   * 
   * @param {UUID} messageID - Identifier of the sent message.
   */
  addListener(eventName: 'onSend', listenerFunc: (messageID: UUID) => void): Promise<PluginListenerHandle>;
  /**
   * When a message fails to send
   * 
   * @param {UUID} messageID - Identifier of the failed message.
   */
  addListener(eventName: 'onFailToSend', listenerFunc: (messageID: UUID) => void): Promise<PluginListenerHandle>;
  /**
   * When data is received
   * 
   * @param {Base64URLString} data - The received data, encoded as a Base64 URL string.
   * @param {UUID} messageID - Identifier of the received message.
   * @param {TransmissionMode} transmissionMode - The transmission mode used when sending the message.
   */
  addListener(eventName: 'onReceiveData', listenerFunc: (data: Base64URLString, messageID: UUID, transmissionMode: TransmissionMode) => void): Promise<PluginListenerHandle>;


  /**
   * When an on-demand secure connection was successfully established
   * 
   * @param {UUID} userId - Identifier of the user with whom the secure connection is established.
   */
  addListener(eventName: 'onEstablishSecureConnection', listenerFunc: (userId: UUID) => void): Promise<PluginListenerHandle>;
  /**
   * When an on-demand secure connection failed to establish
   * 
   * @param {UUID} userId - Identifier of the user with whom the secure connection was attempted.
   * @param {Exception} error - The error that occurred during the connection attempt.
   */
  addListener(eventName: 'onFailToEstablishSecureConnection', listenerFunc: (userId: UUID, error: Exception) => void): Promise<PluginListenerHandle>;

  /**
   * Removes all listeners
   */
  removeAllListeners(): Promise<void>;
}
