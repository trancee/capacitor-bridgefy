import { WebPlugin } from '@capacitor/core';

import type { BridgefyPlugin, ConnectedPeersResult, ExpirationDateResult, InitializeOptions, SendOptions, SendResult, StartOptions, UserIDResult } from './definitions';

export class BridgefyWeb extends WebPlugin implements BridgefyPlugin {
  initialize(options: InitializeOptions): Promise<void> {
    options = options || {};
    throw new Error('Method not implemented.');
  }
  isInitialized(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  stop(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  start(options: StartOptions): Promise<void> {
    options = options || {};
    throw new Error('Method not implemented.');
  }
  isStarted(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  licenseExpirationDate(): Promise<ExpirationDateResult> {
    throw new Error('Method not implemented.');
  }
  updateLicense(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  destroySession(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  currentUserID(): Promise<UserIDResult> {
    throw new Error('Method not implemented.');
  }
  connectedPeers(): Promise<ConnectedPeersResult> {
    throw new Error('Method not implemented.');
  }
  send(options: SendOptions): Promise<SendResult> {
    options = options || {};
    throw new Error('Method not implemented.');
  }
}
