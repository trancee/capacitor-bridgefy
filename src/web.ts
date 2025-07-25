import { WebPlugin } from '@capacitor/core';

import type { BridgefyPlugin, PeerIDs, ExpirationDateResult, InitializeOptions, SendOptions, MessageID, StartOptions, UserID } from './definitions';

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
  currentUserID(): Promise<UserID> {
    throw new Error('Method not implemented.');
  }
  connectedPeers(): Promise<PeerIDs> {
    throw new Error('Method not implemented.');
  }
  send(options: SendOptions): Promise<MessageID> {
    options = options || {};
    throw new Error('Method not implemented.');
  }
}
