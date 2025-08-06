import { WebPlugin } from '@capacitor/core';

import type {
  BridgefyPlugin,
  ConnectedPeersResult,
  LicenseExpirationDateResult,
  InitializeOptions,
  SendOptions,
  StartOptions,
  CurrentUserIDResult,
  Permissions,
  PermissionStatus,
  IsInitializedResult,
  IsStartedResult,
  SendResult,
  EstablishSecureConnectionOptions,
  FingerprintOptions,
  FingerprintResult,
  IsFingerprintValidOptions,
  IsFingerprintValidResult,
  UserID,
  PeerID,
} from './definitions';
import { TransmissionType, UUID } from './definitions';

/**
 * https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md#scanning-api
 */

let userID: UserID = UUID('123e4567-e89b-12d3-a456-426614174000');
let isInitialized = false;
let isStarted = false;
const peers: PeerID[] = [];

export class BridgefyWeb extends WebPlugin implements BridgefyPlugin {
  async initialize(options?: InitializeOptions): Promise<void> {
    console.info('initialize', options ?? '');
    isInitialized = true;
  }
  async isInitialized(): Promise<IsInitializedResult> {
    console.info('isInitialized', { isInitialized });
    return { isInitialized };
  }

  async start(options?: StartOptions): Promise<void> {
    console.info('start', options ?? '');
    if (options?.userID) userID = options.userID;
    isStarted = true;
    this.notifyListeners('onStarted', { userID });
  }
  async isStarted(): Promise<IsStartedResult> {
    console.info('isStarted', { isStarted });
    return { isStarted };
  }

  async stop(): Promise<void> {
    console.info('stop');
    isStarted = false;
    this.notifyListeners('onStopped', {});
  }

  async licenseExpirationDate(): Promise<LicenseExpirationDateResult> {
    console.info('licenseExpirationDate');
    throw this.unimplemented('Method not implemented.');
  }
  async updateLicense(): Promise<void> {
    console.info('updateLicense');
    throw this.unimplemented('Method not implemented.');
  }

  async destroySession(): Promise<void> {
    console.info('destroySession');
    userID = UUID('123e4567-e89b-12d3-a456-426614174000');
    isInitialized = false;
    isStarted = false;
    this.notifyListeners('onDestroySession', {});
  }
  async currentUserID(): Promise<CurrentUserIDResult> {
    console.info('currentUserID', { userID });
    return { userID };
  }

  async connectedPeers(): Promise<ConnectedPeersResult> {
    console.info('connectedPeers', { peers });
    return { peers };
  }

  async establishSecureConnection(options: EstablishSecureConnectionOptions): Promise<void> {
    console.info('establishSecureConnection', options);
    throw this.unimplemented('Method not implemented.');
  }
  async fingerprint(options: FingerprintOptions): Promise<FingerprintResult> {
    console.info('fingerprint', options);
    throw this.unimplemented('Method not implemented.');
  }
  async isFingerprintValid(options: IsFingerprintValidOptions): Promise<IsFingerprintValidResult> {
    console.info('isFingerprintValid', options);
    throw this.unimplemented('Method not implemented.');
  }

  async send(options: SendOptions): Promise<SendResult> {
    console.info('send', options);
    if (options.transmissionMode?.type === TransmissionType.BROADCAST && !options.transmissionMode?.uuid) {
      options.transmissionMode.uuid = userID;
    }
    const messageID = UUID('123e4567-e89b-12d3-a456-426614174000');
    this.notifyListeners('onSend', { messageID });
    this.notifyListeners('onReceive', { messageID, ...options });
    return { messageID };
  }

  async checkPermissions(): Promise<PermissionStatus> {
    console.info('checkPermissions');
    return {
      bluetooth: (await navigator.bluetooth.getAvailability()) ? 'prompt' : 'denied', // (await navigator.permissions.query({ name: 'bluetooth' })).state,
      location: (await navigator.permissions.query({ name: 'geolocation' })).state,
    };
  }
  async requestPermissions(options?: Permissions): Promise<PermissionStatus> {
    console.info('requestPermissions', options ?? '');
    const permissionStatus: PermissionStatus = {};
    if (options?.permissions?.includes('bluetooth')) {
      try {
        await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
        permissionStatus.bluetooth = 'granted';
        // permissionStatus.bluetooth = (await navigator.bluetooth.requestLEScan({ acceptAllAdvertisements: true })).active
        //   ? 'granted'
        //   : 'denied';
      } catch {
        permissionStatus.bluetooth = 'denied';
      }
    }
    if (options?.permissions?.includes('location')) {
      permissionStatus.location = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          () => {
            resolve('granted');
          },
          () => {
            resolve('denied');
          },
        );
      });
    }
    return permissionStatus;
  }
}
