import { WebPlugin } from '@capacitor/core';

import type {
  BridgefyPlugin,
  ConnectedPeersResult,
  LicenseExpirationDateResult,
  InitializeOptions,
  SendOptions,
  StartOptions,
  UserIDResult,
  BridgefyPermissions,
  PermissionStatus,
  IsInitializedResult,
  IsStartedResult,
  SendResult,
  EstablishSecureConnectionOptions,
  FingerprintOptions,
  FingerprintResult,
  IsFingerprintValidOptions,
  IsFingerprintValidResult,
} from './definitions';

export class BridgefyWeb extends WebPlugin implements BridgefyPlugin {
  initialize(options: InitializeOptions): Promise<void> {
    console.info('initialize', options);
    throw this.unimplemented('Method not implemented.');
  }
  isInitialized(): Promise<IsInitializedResult> {
    throw this.unimplemented('Method not implemented.');
  }

  start(options: StartOptions): Promise<void> {
    console.info('start', options);
    throw this.unimplemented('Method not implemented.');
  }
  isStarted(): Promise<IsStartedResult> {
    throw this.unimplemented('Method not implemented.');
  }

  stop(): Promise<void> {
    throw this.unimplemented('Method not implemented.');
  }

  licenseExpirationDate(): Promise<LicenseExpirationDateResult> {
    throw this.unimplemented('Method not implemented.');
  }
  updateLicense(): Promise<void> {
    throw this.unimplemented('Method not implemented.');
  }

  destroySession(): Promise<void> {
    throw this.unimplemented('Method not implemented.');
  }
  currentUserID(): Promise<UserIDResult> {
    throw this.unimplemented('Method not implemented.');
  }

  connectedPeers(): Promise<ConnectedPeersResult> {
    throw this.unimplemented('Method not implemented.');
  }

  establishSecureConnection(options: EstablishSecureConnectionOptions): Promise<void> {
    console.info('establishSecureConnection', options);
    throw this.unimplemented('Method not implemented.');
  }
  fingerprint(options: FingerprintOptions): Promise<FingerprintResult> {
    console.info('fingerprint', options);
    throw this.unimplemented('Method not implemented.');
  }
  isFingerprintValid(options: IsFingerprintValidOptions): Promise<IsFingerprintValidResult> {
    console.info('isFingerprintValid', options);
    throw this.unimplemented('Method not implemented.');
  }

  send(options: SendOptions): Promise<SendResult> {
    console.info('send', options);
    throw this.unimplemented('Method not implemented.');
  }

  checkPermissions(): Promise<PermissionStatus> {
    throw this.unimplemented('Method not implemented.');
  }
  requestPermissions(permissions?: BridgefyPermissions): Promise<PermissionStatus> {
    console.info('requestPermissions', permissions);
    throw this.unimplemented('Method not implemented.');
  }
}
