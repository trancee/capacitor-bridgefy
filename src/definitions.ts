import { PluginListenerHandle } from '@capacitor/core';

declare module '@capacitor/core' {
  interface PluginRegistry {
    Bridgefy: BridgefyPlugin;
  }
}

export type UUID = {
  uuid: string;
}

export type MessageException = {
  message: string;
}

export enum RegistrationError {
  REGISTRATION_FAILED = -66,
  REGISTRATION_FAILED_NETWORK = -1,
  REGISTRATION_FAILED_DEVICE = -2,
  REGISTRATION_FAILED_INVALID = -3,
}

export enum StateError {
  // Bluetooth Low Energy (BLE) is not supported in any of its forms in the current device.
  BLE_NOT_SUPPORTED = -10,
  // Necessary permissions were not granted for the current implementation.
  INSUFFICIENT_PERMISSIONS = -20,
  // Location Services were disabled on this device during framework initialization.
  LOCATION_SERVICES_DISABLED = -30,

  INITIALIZATION_ERROR = -40,
}

// A representation of a Bridgefy enabled device that has been detected by the framework.
export type Device = {
  name: string;
  address: string;

  antennaType: Antenna;

  userId: string;
  sessionId: string;

  // crc: number;
}

// Connection methods available in Bridgefy
export enum Antenna {
  BLUETOOTH = "BLUETOOTH",
  BLUETOOTH_LE = "BLUETOOTH_LE",
  UNREACHABLE = "UNREACHABLE",
}

// A basic representation of a Session object which exposes parameters and objects related to existing Sessions with nearby devices.
export type Session = {
  // publicKey: string;

  antennaType: Antenna;

  userId: string;

  // crc: number;
}

// A representation of data that can be sent or received.
export type Message = {
  // A string representation of the UUID used to identify this Message object
  readonly uuid: string;

  // A HashMap object representing the content of the Message
  content?: Map<string, object>;
  // byte array of binary content
  data?: string;

  // A string representation of the UUID of the Message destinatary
  receiverId?: string;
  // A string representation of the UUID of the Message sender
  readonly senderId: string;

  // The date in which the Message object was first created in Epoch representation
  readonly dateSent: number;

  // number of jumps to recipient
  readonly hops: number;

  // indicates whether the message was sent through the mesh
  readonly isMesh: boolean;
}

// The profile to run the Bridgefy framework with.
// Connection reliability is a priority across all profiles, but they differ in terms of how often messages will be relayed and how quickly will new devices be discovered, among other internal tweaks to preserve device battery life.
export enum BFEnergyProfile {
  // The most power-efficient profile.
  // Devices discovery and self advertising will be brought down to a minimum, but incoming connections will be accepted without any delay.
  ENERGY_SAVER = "ENERGY_SAVER",

  // The most balanced profile.
  // A fine-tuned balanced profile with quick devices discovery and a consistent self advertising frequency.
  BALANCED = "BALANCED",

  // The highest performance profile but also the most power-consuming.
  // Typically it will discover nearby devices almost instantly and perform the most connection retries after interruptions, among other tweaks.
  HIGH_PERFORMANCE = "HIGH_PERFORMANCE",
}

// Available profiles for Bluetooth LE functionality
export enum BFBleProfile {
  EXTENDED_RANGE = "EXTENDED_RANGE",
  DOUBLE_RATE = "DOUBLE_RATE",
  BACKWARDS_COMPATIBLE = "BACKWARDS_COMPATIBLE",
}

// The desired profile to determine the framework behavior or the specific treatment for an individual message.
export enum BFEngineProfile {
  // The standard profile to use in most general network conditions.
  DEFAULT = "DEFAULT",

  // This profile is fine tuned for massive congregations with a high amount of activated devices expected such as concerts or demonstrations.
  HIGH_DENSITY_NETWORK = "HIGH_DENSITY_NETWORK",

  // This profile is perfect for places with a rather low density of activated devices such as remote communities or campgrounds.
  SPARSE_NETWORK = "SPARSE_NETWORK",

  // This profile ensures that the biggest effort in deliver your message is made.
  // This profile should be reserved for emergency situations and be used sparingly. In general it's not a good idea to use this method to initialize the SDK as a whole but rather to use it only to send specific messages.
  LONG_REACH = "LONG_REACH",

  // This profile is meant to be used for sending information that might be replaced frequently as it's duration is short-lived
  SHORT_REACH = "SHORT_REACH",

  // This profile is only meant to be used if you don't want your messages to be stored or forwarded.
  // This means that a message will be delivered once and then discarded. It will not be forwarded via mesh.
  NO_FORWARDING = "NO_FORWARDING",
}

// A configuration object provided
export type Config = {
  // The maximum connection attempts to a particular Device.
  // If exceeded, it will be blacklisted and no further connection attempts will be performed.
  maxConnectionRetries?: number;

  // The Antenna for the appropriate interface intended for the discovery and connection of devices.
  // This interface must be the same across all installs in order to discover and connect devices.
  antennaType?: Antenna;

  // Whether or not to enable encryption for the outgoing messages.
  // Incoming encrypted messages will still be decrypted correctly.
  encryption: boolean;
  autoConnect: boolean;

  // The BFEnergyProfile to run the Bridgefy framework with.
  // If not specified, it will default to BFEnergyProfile.BALANCED
  energyProfile?: BFEnergyProfile;

  // Use this if you want to override the Antenna.BLUETOOTH_LE PHY features that are automatically selected by the system.
  // If the selected profile is not supported, it may fallback to a system default or BFBleProfile.BACKWARDS_COMPATIBLE if Bluetooth 5 is not supported.
  bleProfile?: BFBleProfile;

  // The profile that will be used for sending messages.
  // If not specified, it will default to BFEngineProfile.BFConfigProfileDefault
  engineProfile?: BFEngineProfile;
}

export interface BridgefyPlugin {
  // This method performs the base initialization and registration necessary to start framework operations.
  initialize(options: {
    // A valid API key.
    apiKey: string,
    // A configuration object provided.
    config?: Config,

    debug?: boolean,
  }): Promise<void>;

  // Starts all framework operations, including discovery and advertising with a custom Config object.
  start(options: {
    config?: Config,
  }): Promise<void>;
  // Stop all framework operations and release any system resources.
  stop(): Promise<boolean>;

  // This method will pause ongoing discovery and advertising operations.
  pause(): Promise<boolean>;
  // This method will restart discovery and advertising operations if they are not currently active.
  resume(): Promise<boolean>;

  // Sends a user defined content to all of the nearby devices using the profile specification to treat the message in a particular way throughout it's lifecycle.
  // Returns: A string representation of the UUID used to identify this Message throughout the Bridgefy framework.
  //          Null if the Message could not be sent
  sendBroadcastMessage(options: {
    // A Message object to be broadcasted.
    // The receiverId field does not need to be set.
    message: Message,

    // The desired BFEngineProfile to treat this message in a particular way.
    // BFEngineProfile.BFConfigProfileDefault will be used if none is specified.
    profile?: BFEngineProfile,
  }): Promise<UUID>;

  // Send a Message object to the user specified in the receiverId field of the message using the profile specification to treat the message in a particular way throughout it's lifecycle.
  // This method will override any selected profile in the Config
  // Returns: A string representation of the UUID used to identify this Message throughout the Bridgefy framework.
  //          Null if the Message could not be sent
  sendMessage(options: {
    // A Message containing the information to be sent.
    message: Message,

    // The desired BFEngineProfile to treat this message in a particular way.
    profile?: BFEngineProfile,
  }): Promise<UUID>;

  // RegistrationListener
  // The callback listener used to let an implementation know when and if the Bridgefy SDK initialization succeeded or not after asynchronous calls to check for a valid license.

  // Called asynchronously when the registration process was successful.
  addListener(eventName: 'onRegistrationSuccessful', listenerFunc: () => void): PluginListenerHandle;
  // Called asynchronously when the registration process was unsuccessful.
  addListener(eventName: 'onRegistrationFailed', listenerFunc: (message: string, errorCode: RegistrationError) => void): PluginListenerHandle;

  // StateListener
  // Callback for all connections and other general events in the SDK.

  // Called when all framework operations have been properly started
  addListener(eventName: 'onStarted', listenerFunc: () => void): PluginListenerHandle;
  // Called when there was an error starting framework operations
  addListener(eventName: 'onStartError', listenerFunc: (message: string, errorCode: StateError) => void): PluginListenerHandle;
  // Called when all framework operations have been properly stopped
  addListener(eventName: 'onStopped', listenerFunc: () => void): PluginListenerHandle;

  // Notifies the listener whenever a connection with a nearby device that shares an API key (i.e. a device compatible with your implementation) has just been established.
  addListener(eventName: 'onDeviceConnected', listenerFunc: (device: Device, session: Session) => void): PluginListenerHandle;
  // Notifies the listener whenever a connection with a nearby device that shares an API key (i.e. a device compatible with your implementation) has just been lost.
  addListener(eventName: 'onDeviceLost', listenerFunc: (device: Device) => void): PluginListenerHandle;

  addListener(eventName: 'onDeviceDetected', listenerFunc: (device: Device) => void): PluginListenerHandle;
  addListener(eventName: 'onDeviceUnavailable', listenerFunc: (device: Device) => void): PluginListenerHandle;

  // Notifies the listener whenever a Device has been permanently blacklisted.
  // This means it's impossible to establish connectivity to this device and no more connection attempts will be performed.
  addListener(eventName: 'onDeviceBlackListed', listenerFunc: (device: Device) => void): PluginListenerHandle;

  // MessageListener
  // Callback for all Message events.

  // Callback for whenever a personal Message addressed to the current user is received.
  addListener(eventName: 'onMessageReceived', listenerFunc: (message: Message) => void): PluginListenerHandle;
  // Called when a Message is sent.
  addListener(eventName: 'onMessageSent', listenerFunc: (messageId: string) => void): PluginListenerHandle;

  // Called when a Message wasn't able to be encrypted/decrypted due to the message being encrypted with an outdated key.
  addListener(eventName: 'onMessageReceivedException', listenerFunc: (sender: string, exception: MessageException) => void): PluginListenerHandle;
  // Called whenever a Message object wasn't able to be sent.
  addListener(eventName: 'onMessageFailed', listenerFunc: (message: Message, exception: MessageException) => void): PluginListenerHandle;

  // Called when a Broadcast (public) message is received.
  addListener(eventName: 'onBroadcastMessageReceived', listenerFunc: (message: Message) => void): PluginListenerHandle;
}
