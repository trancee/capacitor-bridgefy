import { WebPlugin } from '@capacitor/core';
import { BridgefyPlugin } from './definitions';

import {
  UUID,
  Config,
  Message,
  BFEngineProfile
} from './definitions';

export class BridgefyWeb extends WebPlugin implements BridgefyPlugin {
  constructor() {
    super({
      name: 'Bridgefy',
      platforms: ['web'],
    });
  }

  // This method performs the base initialization and registration necessary to start framework operations.
  async initialize(options: {
    apiKey: string,
    config?: Config,

    debug?: boolean,
  }): Promise<void> {
    console.warn('initialize', options);
    throw new Error("Method not implemented.");
  }

  // Starts all framework operations, including discovery and advertising with a custom Config object.
  async start(options: {
    config?: Config,
  }): Promise<void> {
    console.warn('start', options);
    throw new Error("Method not implemented.");
  }
  // Stop all framework operations and release any system resources.
  async stop(): Promise<boolean> {
    console.warn('stop');
    throw new Error("Method not implemented.");
  }

  // This method will pause ongoing discovery and advertising operations.
  async pause(): Promise<boolean> {
    console.warn('pause');
    throw new Error("Method not implemented.");
  }
  // This method will restart discovery and advertising operations if they are not currently active.
  async resume(): Promise<boolean> {
    console.warn('resume');
    throw new Error("Method not implemented.");
  }

  // Sends a user defined content to all of the nearby devices using the profile specification to treat the message in a particular way throughout it's lifecycle.
  // Returns: A string representation of the UUID used to identify this Message throughout the Bridgefy framework.
  //          Null if the Message could not be sent
  async sendBroadcastMessage(options: {
    // A Message object to be broadcasted.
    // The receiverId field does not need to be set.
    message: Message,

    // The desired BFEngineProfile to treat this message in a particular way.
    // BFEngineProfile.BFConfigProfileDefault will be used if none is specified.
    profile?: BFEngineProfile,
  }): Promise<UUID> {
    console.warn('sendBroadcastMessage', options);
    throw new Error("Method not implemented.");
  }

  // Send a Message object to the user specified in the receiverId field of the message using the profile specification to treat the message in a particular way throughout it's lifecycle.
  // This method will override any selected profile in the Config
  // Returns: A string representation of the UUID used to identify this Message throughout the Bridgefy framework.
  //          Null if the Message could not be sent
  async sendMessage(options: {
    // A Message containing the information to be sent.
    message: Message,

    // The desired BFEngineProfile to treat this message in a particular way.
    profile?: BFEngineProfile,
  }): Promise<UUID> {
    console.warn('sendMessage', options);
    throw new Error("Method not implemented.");
  }
}

const Bridgefy = new BridgefyWeb();

export { Bridgefy };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(Bridgefy);
