# @capacitor-trancee/bridgefy

Make your mobile app work without the Internet

## Install

```bash
npm install @capacitor-trancee/bridgefy
npx cap sync
```

## Example

```typescript
```

## Configuration
    
### Android

Add the following permissions to your app’s manifest:

```java
    <uses-permission
        android:name="android.permission.BLUETOOTH"
        android:maxSdkVersion="30" />
    <uses-permission
        android:name="android.permission.BLUETOOTH_ADMIN"
        android:maxSdkVersion="30" />
        
    <uses-permission
        android:name="android.permission.BLUETOOTH_ADVERTISE"
        android:minSdkVersion="31" />
    <uses-permission
        android:name="android.permission.BLUETOOTH_CONNECT"
        android:minSdkVersion="31" />
    <uses-permission
        android:name="android.permission.BLUETOOTH_SCAN"
        android:minSdkVersion="31"
        android:usesPermissionFlags="neverForLocation"
        tools:targetApi="s" />
        
    <uses-permission
        android:name="android.permission.ACCESS_COARSE_LOCATION"
        android:maxSdkVersion="28" />
    <uses-permission
        android:name="android.permission.ACCESS_FINE_LOCATION"
        android:maxSdkVersion="31"
        android:minSdkVersion="29"
        tools:ignore="CoarseFineLocation" />
```

### iOS

Add the following properties to your app’s Information Property List file:

- A message that tells people why the app needs access to Bluetooth.

```xml
<key>NSBluetoothAlwaysUsageDescription</key>
<string>This app requires Bluetooth access to communicate with other devices.</string>
```

> ⚠️ **Warning**  
If your app has a deployment target earlier than iOS 13, add the `NSBluetoothPeripheralUsageDescription` key to your app’s Information Property List file in addition to this key.

- A message that tells people why the app is requesting the ability to connect to Bluetooth peripherals.

```xml
<key>NSBluetoothPeripheralUsageDescription</key>
<string>This app requires Bluetooth access to communicate with other devices.</string>
```

> ⚠️ **Warning**  
This key is required if your app uses APIs that access Bluetooth peripherals and has a deployment target earlier than iOS 13.

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

These configuration values are available:

| Prop                 | Type                                  | Description                                                | Default            | Since |
| -------------------- | ------------------------------------- | ---------------------------------------------------------- | ------------------ | ----- |
| **`apiKey`**         | <code><a href="#uuid">UUID</a></code> | The API key for Bridgefy.                                  |                    | 1.0.0 |
| **`verboseLogging`** | <code>boolean</code>                  | If `true`, enables verbose logging for debugging purposes. | <code>false</code> | 1.0.0 |

### Examples

In `capacitor.config.json`:

```json
{
  "plugins": {
    "Bridgefy": {
      "apiKey": '123e4567-e89b-12d3-a456-426614174000',
      "verboseLogging": true
    }
  }
}
```

In `capacitor.config.ts`:

```ts
/// <reference types="@capacitor-trancee/bridgefy" />

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    Bridgefy: {
      apiKey: '123e4567-e89b-12d3-a456-426614174000',
      verboseLogging: true,
    },
  },
};

export default config;
```

</docgen-config>

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`isInitialized()`](#isinitialized)
* [`start(...)`](#start)
* [`isStarted()`](#isstarted)
* [`stop()`](#stop)
* [`licenseExpirationDate()`](#licenseexpirationdate)
* [`updateLicense()`](#updatelicense)
* [`destroySession()`](#destroysession)
* [`currentUserID()`](#currentuserid)
* [`connectedPeers()`](#connectedpeers)
* [`establishSecureConnection(...)`](#establishsecureconnection)
* [`fingerprint(...)`](#fingerprint)
* [`isFingerprintValid(...)`](#isfingerprintvalid)
* [`send(...)`](#send)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions(...)`](#requestpermissions)
* [`addListener('onStarted', ...)`](#addlisteneronstarted-)
* [`addListener('onFailToStart', ...)`](#addlisteneronfailtostart-)
* [`addListener('onStopped', ...)`](#addlisteneronstopped-)
* [`addListener('onFailToStop', ...)`](#addlisteneronfailtostop-)
* [`addListener('onDestroySession', ...)`](#addlistenerondestroysession-)
* [`addListener('onFailToDestroySession', ...)`](#addlisteneronfailtodestroysession-)
* [`addListener('onConnected', ...)`](#addlisteneronconnected-)
* [`addListener('onDisconnected', ...)`](#addlistenerondisconnected-)
* [`addListener('onConnectedPeers', ...)`](#addlisteneronconnectedpeers-)
* [`addListener('onEstablishSecureConnection', ...)`](#addlisteneronestablishsecureconnection-)
* [`addListener('onFailToEstablishSecureConnection', ...)`](#addlisteneronfailtoestablishsecureconnection-)
* [`addListener('onSend', ...)`](#addlisteneronsend-)
* [`addListener('onFailToSend', ...)`](#addlisteneronfailtosend-)
* [`addListener('onProgressOfSend', ...)`](#addlisteneronprogressofsend-)
* [`addListener('onReceiveData', ...)`](#addlisteneronreceivedata-)
* [`removeAllListeners()`](#removealllisteners)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(options: InitializeOptions) => Promise<void>
```

Initializes Bridgefy operations.

An Internet connection is needed at least for the first time in order to validate the license.

| Param         | Type                                                            |
| ------------- | --------------------------------------------------------------- |
| **`options`** | <code><a href="#initializeoptions">InitializeOptions</a></code> |

**Since:** 1.0.0

--------------------


### isInitialized()

```typescript
isInitialized() => Promise<IsInitializedResult>
```

Checks if the Bridgefy SDK has been initialized.

**Returns:** <code>Promise&lt;<a href="#isinitializedresult">IsInitializedResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### start(...)

```typescript
start(options: StartOptions) => Promise<void>
```

Starts Bridgefy operations, allowing the SDK to participate in the Bridgefy network.

| Param         | Type                                                  |
| ------------- | ----------------------------------------------------- |
| **`options`** | <code><a href="#startoptions">StartOptions</a></code> |

**Since:** 1.0.0

--------------------


### isStarted()

```typescript
isStarted() => Promise<IsStartedResult>
```

Indicates whether the Bridgefy SDK is currently started.

**Returns:** <code>Promise&lt;<a href="#isstartedresult">IsStartedResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### stop()

```typescript
stop() => Promise<void>
```

Stops Bridgefy operations and releases associated resources.

**Since:** 1.0.0

--------------------


### licenseExpirationDate()

```typescript
licenseExpirationDate() => Promise<LicenseExpirationDateResult>
```

Retrieves the expiration date of the Bridgefy license.

**Returns:** <code>Promise&lt;<a href="#licenseexpirationdateresult">LicenseExpirationDateResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### updateLicense()

```typescript
updateLicense() => Promise<void>
```

Updates the Bridgefy license, if necessary.

![Android](assets/android.svg) Only available for Android.

**Since:** 1.0.0

--------------------


### destroySession()

```typescript
destroySession() => Promise<void>
```

Destroys the current session, terminating any active connections and cleaning up resources.

**Since:** 1.0.0

--------------------


### currentUserID()

```typescript
currentUserID() => Promise<CurrentUserIDResult>
```

Retrieves the <a href="#uuid">`UUID`</a> of the current Bridgefy user.

**Returns:** <code>Promise&lt;<a href="#currentuseridresult">CurrentUserIDResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### connectedPeers()

```typescript
connectedPeers() => Promise<ConnectedPeersResult>
```

Retrieves a list of `UUID`s representing the connected peers in the current session.

**Returns:** <code>Promise&lt;<a href="#connectedpeersresult">ConnectedPeersResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### establishSecureConnection(...)

```typescript
establishSecureConnection(options: EstablishSecureConnectionOptions) => Promise<void>
```

Establishes a secure connection with the user.

| Param         | Type                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#establishsecureconnectionoptions">EstablishSecureConnectionOptions</a></code> |

**Since:** 1.0.0

--------------------


### fingerprint(...)

```typescript
fingerprint(options: FingerprintOptions) => Promise<FingerprintResult>
```

Generates a fingerprint for the secure connection established with a specified user.

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#fingerprintoptions">FingerprintOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#fingerprintresult">FingerprintResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### isFingerprintValid(...)

```typescript
isFingerprintValid(options: IsFingerprintValidOptions) => Promise<IsFingerprintValidResult>
```

Verifies the validity of a fingerprint for a particular user.

| Param         | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#isfingerprintvalidoptions">IsFingerprintValidOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#isfingerprintvalidresult">IsFingerprintValidResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### send(...)

```typescript
send(options: SendOptions) => Promise<SendResult>
```

Sends data using a specific transmission mode.

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#sendoptions">SendOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#sendresult">SendResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check for the appropriate permissions to use Nearby.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions(...)

```typescript
requestPermissions(permissions?: Permissions | undefined) => Promise<PermissionStatus>
```

Request the appropriate permissions to use Nearby.

| Param             | Type                                                |
| ----------------- | --------------------------------------------------- |
| **`permissions`** | <code><a href="#permissions">Permissions</a></code> |

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('onStarted', ...)

```typescript
addListener(eventName: 'onStarted', listenerFunc: OnStartedListener) => Promise<PluginListenerHandle>
```

Initialization Listeners

| Param              | Type                                                            |
| ------------------ | --------------------------------------------------------------- |
| **`eventName`**    | <code>'onStarted'</code>                                        |
| **`listenerFunc`** | <code><a href="#onstartedlistener">OnStartedListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailToStart', ...)

```typescript
addListener(eventName: 'onFailToStart', listenerFunc: OnFailToStartListener) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToStart'</code>                                            |
| **`listenerFunc`** | <code><a href="#onfailtostartlistener">OnFailToStartListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onStopped', ...)

```typescript
addListener(eventName: 'onStopped', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

| Param              | Type                       |
| ------------------ | -------------------------- |
| **`eventName`**    | <code>'onStopped'</code>   |
| **`listenerFunc`** | <code>() =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailToStop', ...)

```typescript
addListener(eventName: 'onFailToStop', listenerFunc: OnFailToStopListener) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToStop'</code>                                           |
| **`listenerFunc`** | <code><a href="#onfailtostoplistener">OnFailToStopListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onDestroySession', ...)

```typescript
addListener(eventName: 'onDestroySession', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

| Param              | Type                            |
| ------------------ | ------------------------------- |
| **`eventName`**    | <code>'onDestroySession'</code> |
| **`listenerFunc`** | <code>() =&gt; void</code>      |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailToDestroySession', ...)

```typescript
addListener(eventName: 'onFailToDestroySession', listenerFunc: OnFailToDestroySessionListener) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToDestroySession'</code>                                                     |
| **`listenerFunc`** | <code><a href="#onfailtodestroysessionlistener">OnFailToDestroySessionListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onConnected', ...)

```typescript
addListener(eventName: 'onConnected', listenerFunc: OnConnectedListener) => Promise<PluginListenerHandle>
```

When a peer has established connection.

| Param              | Type                                                                |
| ------------------ | ------------------------------------------------------------------- |
| **`eventName`**    | <code>'onConnected'</code>                                          |
| **`listenerFunc`** | <code><a href="#onconnectedlistener">OnConnectedListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('onDisconnected', ...)

```typescript
addListener(eventName: 'onDisconnected', listenerFunc: OnDisconnectedListener) => Promise<PluginListenerHandle>
```

When a peer is disconnected (out of range).

| Param              | Type                                                                      |
| ------------------ | ------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onDisconnected'</code>                                             |
| **`listenerFunc`** | <code><a href="#ondisconnectedlistener">OnDisconnectedListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('onConnectedPeers', ...)

```typescript
addListener(eventName: 'onConnectedPeers', listenerFunc: OnConnectedPeersListener) => Promise<PluginListenerHandle>
```

When a device is detected, notifies the list of connected users.

![Android](assets/android.svg) Only available for Android.

| Param              | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onConnectedPeers'</code>                                               |
| **`listenerFunc`** | <code><a href="#onconnectedpeerslistener">OnConnectedPeersListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('onEstablishSecureConnection', ...)

```typescript
addListener(eventName: 'onEstablishSecureConnection', listenerFunc: OnEstablishSecureConnectionListener) => Promise<PluginListenerHandle>
```

When an on-demand secure connection was successfully established.

| Param              | Type                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onEstablishSecureConnection'</code>                                                          |
| **`listenerFunc`** | <code><a href="#onestablishsecureconnectionlistener">OnEstablishSecureConnectionListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('onFailToEstablishSecureConnection', ...)

```typescript
addListener(eventName: 'onFailToEstablishSecureConnection', listenerFunc: OnFailToEstablishSecureConnectionListener) => Promise<PluginListenerHandle>
```

When an on-demand secure connection failed to establish.

| Param              | Type                                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToEstablishSecureConnection'</code>                                                                |
| **`listenerFunc`** | <code><a href="#onfailtoestablishsecureconnectionlistener">OnFailToEstablishSecureConnectionListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('onSend', ...)

```typescript
addListener(eventName: 'onSend', listenerFunc: OnSendListener) => Promise<PluginListenerHandle>
```

When a message is sent.

| Param              | Type                                                      |
| ------------------ | --------------------------------------------------------- |
| **`eventName`**    | <code>'onSend'</code>                                     |
| **`listenerFunc`** | <code><a href="#onsendlistener">OnSendListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('onFailToSend', ...)

```typescript
addListener(eventName: 'onFailToSend', listenerFunc: OnFailToSendListener) => Promise<PluginListenerHandle>
```

When a message fails to send.

| Param              | Type                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToSend'</code>                                           |
| **`listenerFunc`** | <code><a href="#onfailtosendlistener">OnFailToSendListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('onProgressOfSend', ...)

```typescript
addListener(eventName: 'onProgressOfSend', listenerFunc: OnProgressOfSendListener) => Promise<PluginListenerHandle>
```

When sending progress update.

![Android](assets/android.svg) Only available for Android.

| Param              | Type                                                                          |
| ------------------ | ----------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onProgressOfSend'</code>                                               |
| **`listenerFunc`** | <code><a href="#onprogressofsendlistener">OnProgressOfSendListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('onReceiveData', ...)

```typescript
addListener(eventName: 'onReceiveData', listenerFunc: OnReceiveDataListener) => Promise<PluginListenerHandle>
```

When data is received.

| Param              | Type                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| **`eventName`**    | <code>'onReceiveData'</code>                                            |
| **`listenerFunc`** | <code><a href="#onreceivedatalistener">OnReceiveDataListener</a></code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all listeners for this plugin.

**Since:** 1.0.0

--------------------


### Interfaces


#### InitializeOptions

| Prop                 | Type                                  | Description                                                | Since |
| -------------------- | ------------------------------------- | ---------------------------------------------------------- | ----- |
| **`apiKey`**         | <code><a href="#uuid">UUID</a></code> | The API key for Bridgefy.                                  | 1.0.0 |
| **`verboseLogging`** | <code>boolean</code>                  | If `true`, enables verbose logging for debugging purposes. | 1.0.0 |


#### IsInitializedResult

| Prop                | Type                 |
| ------------------- | -------------------- |
| **`isInitialized`** | <code>boolean</code> |


#### StartOptions

| Prop                     | Type                                                              | Description                                                                                                 | Default                                  |
| ------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **`userID`**             | <code><a href="#userid">UserID</a></code>                         | The ID used to identify the user in the Bridgefy network. If not provided, a new user ID will be generated. |                                          |
| **`propagationProfile`** | <code><a href="#propagationprofile">PropagationProfile</a></code> | A profile that defines a series of properties and rules for the propagation of messages.                    | <code>PropagationProfile.STANDARD</code> |


#### IsStartedResult

| Prop            | Type                 |
| --------------- | -------------------- |
| **`isStarted`** | <code>boolean</code> |


#### LicenseExpirationDateResult

| Prop                        | Type                | Description                                                                                                                                                                                                                                                                              | Since |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`licenseExpirationDate`** | <code>number</code> | The expiration date of the license. The time in milliseconds that has elapsed since the epoch, which is defined as the midnight at the beginning of January 1, 1970, UTC (equivalent to the UNIX epoch). This timestamp is timezone-agnostic and uniquely defines an instant in history. | 1.0.0 |


#### CurrentUserIDResult

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`userID`** | <code><a href="#userid">UserID</a></code> |


#### ConnectedPeersResult

| Prop        | Type                |
| ----------- | ------------------- |
| **`peers`** | <code>UUID[]</code> |


#### EstablishSecureConnectionOptions

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`userID`** | <code><a href="#userid">UserID</a></code> |


#### FingerprintResult

| Prop              | Type                                      |
| ----------------- | ----------------------------------------- |
| **`fingerprint`** | <code><a href="#base64">Base64</a></code> |


#### FingerprintOptions

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`userID`** | <code><a href="#userid">UserID</a></code> |


#### IsFingerprintValidResult

| Prop          | Type                 |
| ------------- | -------------------- |
| **`isValid`** | <code>boolean</code> |


#### IsFingerprintValidOptions

| Prop              | Type                                      |
| ----------------- | ----------------------------------------- |
| **`userID`**      | <code><a href="#userid">UserID</a></code> |
| **`fingerprint`** | <code><a href="#base64">Base64</a></code> |


#### SendResult

| Prop            | Type                                            |
| --------------- | ----------------------------------------------- |
| **`messageID`** | <code><a href="#messageid">MessageID</a></code> |


#### SendOptions

| Prop                   | Type                                                          |
| ---------------------- | ------------------------------------------------------------- |
| **`data`**             | <code><a href="#base64">Base64</a></code>                     |
| **`transmissionMode`** | <code><a href="#transmissionmode">TransmissionMode</a></code> |


#### TransmissionMode

There are several modes for sending packets:

- **Broadcast**
Sends a packet using mesh without a defined receiver. The packet is broadcast to all nearby users that are in range, who then broadcast it to all receivers that are in their range, and so on. If a user isn't in range, the packet will be delivered the next time said user comes within range of another user who did receive the packet. Broadcast messages can be read by all nodes that receive it.
- **Mesh**
Sends the packet using mesh to only once receiver. It doesn't need the receiver to be in range. Receiver can be in range of a third receiver located within range of both sender and receiver at the same time, or receiver can be out of range of all other nodes, but eventually come within range of a node that at some point received the packet. Mesh messages can be received by multiple nodes, but can only be read by the intended receiver.
- **P2P**
Sends the packet only when the receiver is in range.

| Prop       | Type                                                          |
| ---------- | ------------------------------------------------------------- |
| **`type`** | <code><a href="#transmissiontype">TransmissionType</a></code> |
| **`uuid`** | <code><a href="#uuid">UUID</a></code>                         |


#### PermissionStatus

| Prop            | Type                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                   | Since |
| --------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| **`bluetooth`** | <code><a href="#permissionstate">PermissionState</a></code> | `BLUETOOTH_ADVERTISE` Required to be able to advertise to nearby Bluetooth devices. `BLUETOOTH_CONNECT` Required to be able to connect to paired Bluetooth devices. `BLUETOOTH_SCAN` Required to be able to discover and pair nearby Bluetooth devices. `BLUETOOTH` Allows applications to connect to paired bluetooth devices. `BLUETOOTH_ADMIN` Allows applications to discover and pair bluetooth devices. | 0.0.1 |
| **`location`**  | <code><a href="#permissionstate">PermissionState</a></code> | `ACCESS_FINE_LOCATION` Allows an app to access precise location. `ACCESS_COARSE_LOCATION` Allows an app to access approximate location.                                                                                                                                                                                                                                                                       | 0.0.1 |


#### Permissions

| Prop              | Type                          |
| ----------------- | ----------------------------- |
| **`permissions`** | <code>PermissionType[]</code> |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


#### OnStartedEvent

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`userID`** | <code><a href="#userid">UserID</a></code> |


#### OnFailToStartEvent

| Prop         | Type                                      | Description                 | Since |
| ------------ | ----------------------------------------- | --------------------------- | ----- |
| **`reason`** | <code><a href="#reason">Reason</a></code> | The reason for the failure. | 1.0.0 |


#### Reason

| Prop          | Type                                              |
| ------------- | ------------------------------------------------- |
| **`type`**    | <code><a href="#reasontype">ReasonType</a></code> |
| **`message`** | <code>string</code>                               |
| **`code`**    | <code>number</code>                               |


#### OnFailToStopEvent

| Prop         | Type                                      | Description                 | Since |
| ------------ | ----------------------------------------- | --------------------------- | ----- |
| **`reason`** | <code><a href="#reason">Reason</a></code> | The reason for the failure. | 1.0.0 |


#### OnFailToDestroySessionEvent

| Prop         | Type                                      | Description                 | Since |
| ------------ | ----------------------------------------- | --------------------------- | ----- |
| **`reason`** | <code><a href="#reason">Reason</a></code> | The reason for the failure. | 1.0.0 |


#### OnConnectedEvent

| Prop         | Type                                      | Description                                               | Since |
| ------------ | ----------------------------------------- | --------------------------------------------------------- | ----- |
| **`peerID`** | <code><a href="#peerid">PeerID</a></code> | Identifier of the peer that has established a connection. | 1.0.0 |


#### OnDisconnectedEvent

| Prop         | Type                                      | Description                          | Since |
| ------------ | ----------------------------------------- | ------------------------------------ | ----- |
| **`peerID`** | <code><a href="#peerid">PeerID</a></code> | Identifier of the disconnected peer. | 1.0.0 |


#### OnConnectedPeersEvent

| Prop        | Type                | Description                                 | Since |
| ----------- | ------------------- | ------------------------------------------- | ----- |
| **`peers`** | <code>UUID[]</code> | List of identifiers of the connected peers. | 1.0.0 |


#### OnEstablishSecureConnectionEvent

| Prop         | Type                                      | Description                                                            | Since |
| ------------ | ----------------------------------------- | ---------------------------------------------------------------------- | ----- |
| **`userID`** | <code><a href="#userid">UserID</a></code> | Identifier of the user with whom the secure connection is established. | 1.0.0 |


#### OnFailToEstablishSecureConnectionEvent

| Prop         | Type                                      | Description                                                           | Since |
| ------------ | ----------------------------------------- | --------------------------------------------------------------------- | ----- |
| **`userID`** | <code><a href="#userid">UserID</a></code> | Identifier of the user with whom the secure connection was attempted. | 1.0.0 |
| **`reason`** | <code><a href="#reason">Reason</a></code> | The reason for the failure.                                           | 1.0.0 |


#### OnSendEvent

| Prop            | Type                                            | Description                     | Since |
| --------------- | ----------------------------------------------- | ------------------------------- | ----- |
| **`messageID`** | <code><a href="#messageid">MessageID</a></code> | Identifier of the sent message. | 1.0.0 |


#### OnFailToSendEvent

| Prop            | Type                                            | Description                       | Since |
| --------------- | ----------------------------------------------- | --------------------------------- | ----- |
| **`messageID`** | <code><a href="#messageid">MessageID</a></code> | Identifier of the failed message. | 1.0.0 |
| **`reason`**    | <code><a href="#reason">Reason</a></code>       | The reason for the failure.       | 1.0.0 |


#### OnProgressOfSendEvent

| Prop            | Type                                            | Description                                 | Since |
| --------------- | ----------------------------------------------- | ------------------------------------------- | ----- |
| **`messageID`** | <code><a href="#messageid">MessageID</a></code> | Identifier of the message being sent.       | 1.0.0 |
| **`position`**  | <code>number</code>                             | Current position of the message being sent. | 1.0.0 |
| **`of`**        | <code>number</code>                             | Total size of the message being sent.       | 1.0.0 |


#### OnReceiveDataEvent

| Prop                   | Type                                                          | Description                                                            | Since |
| ---------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- | ----- |
| **`messageID`**        | <code><a href="#messageid">MessageID</a></code>               | Identifier of the received message.                                    | 1.0.0 |
| **`data`**             | <code><a href="#base64">Base64</a></code>                     | The received data, encoded as a <a href="#base64">`Base64`</a> string. | 1.0.0 |
| **`transmissionMode`** | <code><a href="#transmissionmode">TransmissionMode</a></code> | The transmission mode used when sending the message.                   | 1.0.0 |


### Type Aliases


#### UUID

<code>string & { readonly __brand: unique symbol }</code>


#### UserID

<code><a href="#uuid">UUID</a></code>


#### PeerID

<code><a href="#uuid">UUID</a></code>


#### Base64

<code>string & { readonly __brand: unique symbol }</code>


#### MessageID

<code><a href="#uuid">UUID</a></code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### PermissionType

<code>'bluetooth' | 'location'</code>


#### OnStartedListener

<code>(event: <a href="#onstartedevent">OnStartedEvent</a>): void</code>


#### OnFailToStartListener

<code>(event: <a href="#onfailtostartevent">OnFailToStartEvent</a>): void</code>


#### OnFailToStopListener

<code>(event: <a href="#onfailtostopevent">OnFailToStopEvent</a>): void</code>


#### OnFailToDestroySessionListener

<code>(event: <a href="#onfailtodestroysessionevent">OnFailToDestroySessionEvent</a>): void</code>


#### OnConnectedListener

<code>(event: <a href="#onconnectedevent">OnConnectedEvent</a>): void</code>


#### OnDisconnectedListener

<code>(event: <a href="#ondisconnectedevent">OnDisconnectedEvent</a>): void</code>


#### OnConnectedPeersListener

<code>(event: <a href="#onconnectedpeersevent">OnConnectedPeersEvent</a>): void</code>


#### OnEstablishSecureConnectionListener

<code>(event: <a href="#onestablishsecureconnectionevent">OnEstablishSecureConnectionEvent</a>): void</code>


#### OnFailToEstablishSecureConnectionListener

<code>(event: <a href="#onfailtoestablishsecureconnectionevent">OnFailToEstablishSecureConnectionEvent</a>): void</code>


#### OnSendListener

<code>(event: <a href="#onsendevent">OnSendEvent</a>): void</code>


#### OnFailToSendListener

<code>(event: <a href="#onfailtosendevent">OnFailToSendEvent</a>): void</code>


#### OnProgressOfSendListener

<code>(event: <a href="#onprogressofsendevent">OnProgressOfSendEvent</a>): void</code>


#### OnReceiveDataListener

<code>(event: <a href="#onreceivedataevent">OnReceiveDataEvent</a>): void</code>


### Enums


#### PropagationProfile

| Members                        | Value                                 | Description                                                              | Since |
| ------------------------------ | ------------------------------------- | ------------------------------------------------------------------------ | ----- |
| **`STANDARD`**                 | <code>'standard'</code>               | Represents a standard propagation profile.                               | 1.0.0 |
| **`HIGH_DENSITY_ENVIRONMENT`** | <code>'highDensityEnvironment'</code> | Indicates a propagation profile suitable for high-density networks.      | 1.0.0 |
| **`SPARSE_ENVIRONMENT`**       | <code>'sparseEnvironment'</code>      | Represents a propagation profile tailored for sparse networks.           | 1.0.0 |
| **`LONG_REACH`**               | <code>'longReach'</code>              | Indicates a propagation profile optimized for long reach.                | 1.0.0 |
| **`SHORT_REACH`**              | <code>'shortReach'</code>             | Represents a propagation profile designed for short reach communication. | 1.0.0 |


#### TransmissionType

| Members         | Value                    | Description                                                                             | Since |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------- | ----- |
| **`BROADCAST`** | <code>'broadcast'</code> | Propagate a message readable by every device that receives it.                          | 1.0.0 |
| **`MESH`**      | <code>'mesh'</code>      | Deliver a message to a specific recipient using nearby devices to propagate it.         | 1.0.0 |
| **`P2P`**       | <code>'p2p'</code>       | Deliver a message to a specific recipient only if there's an active connection with it. | 1.0.0 |


#### ReasonType

| Members                               | Value                                       | Description                                                                                                              | Since |
| ------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----- |
| **`ALREADY_STARTED`**                 | <code>'alreadyStarted'</code>               | The Bridgefy SDK is already running.                                                                                     | 1.0.0 |
| **`EXPIRED_LICENSE`**                 | <code>'expiredLicense'</code>               | The license is expired.                                                                                                  | 1.0.0 |
| **`INCONSISTENT_DEVICE_TIME`**        | <code>'inconsistentDeviceTime'</code>       | The device's time has been modified.                                                                                     | 1.0.0 |
| **`INTERNET_CONNECTION_REQUIRED`**    | <code>'internetConnectionRequired'</code>   | An internet connection is required to validate the license.                                                              | 1.0.0 |
| **`INVALID_API_KEY`**                 | <code>'invalidAPIKey'</code>                | The provided API key is invalid.                                                                                         | 1.0.0 |
| **`SESSION_ERROR`**                   | <code>'sessionError'</code>                 | An error occurred while creating the session.                                                                            | 1.0.0 |
| **`SIMULATOR_IS_NOT_SUPPORTED`**      | <code>'simulatorIsNotSupported'</code>      | The Bridgefy SDK cannot run in the simulator.                                                                            | 1.0.0 |
| **`DEVICE_CAPABILITIES`**             | <code>'deviceCapabilities'</code>           | ![Android](assets/android.svg) Only available for Android.                                                               | 1.0.0 |
| **`GENERIC`**                         | <code>'generic'</code>                      | ![Android](assets/android.svg) Only available for Android.                                                               | 1.0.0 |
| **`MISSING_APPLICATION_ID`**          | <code>'missingApplicationID'</code>         | ![Android](assets/android.svg) Only available for Android.                                                               | 1.0.0 |
| **`PERMISSION`**                      | <code>'permission'</code>                   | ![Android](assets/android.svg) Only available for Android.                                                               | 1.0.0 |
| **`REGISTRATION`**                    | <code>'registration'</code>                 | ![Android](assets/android.svg) Only available for Android.                                                               | 1.0.0 |
| **`SIZE_LIMIT_EXCEEDED`**             | <code>'sizeLimitExceeded'</code>            | ![Android](assets/android.svg) Only available for Android.                                                               | 1.0.0 |
| **`UNKNOWN`**                         | <code>'unknown'</code>                      | ![Android](assets/android.svg) Only available for Android.                                                               | 1.0.0 |
| **`MISSING_BUNDLE_ID`**               | <code>'missingBundleID'</code>              | Cannot get app's bundle ID. ![iOS](assets/ios.svg) Only available for iOS.                                               | 1.0.0 |
| **`INCONSISTENT_USER_ID`**            | <code>'inconsistentUserID'</code>           | The userId passed in the start function is different from the stored one. ![iOS](assets/ios.svg) Only available for iOS. | 1.0.0 |
| **`NOT_STARTED`**                     | <code>'notStarted'</code>                   | The Bridgefy SDK hasn't been started. ![iOS](assets/ios.svg) Only available for iOS.                                     | 1.0.0 |
| **`ALREADY_INSTANTIATED`**            | <code>'alreadyInstantiated'</code>          | A Bridgefy SDK instance already exists. ![iOS](assets/ios.svg) Only available for iOS.                                   | 1.0.0 |
| **`START_IN_PROGRESS`**               | <code>'startInProgress'</code>              | The Bridgefy SDK is performing the start process. ![iOS](assets/ios.svg) Only available for iOS.                         | 1.0.0 |
| **`STOP_IN_PROGRESS`**                | <code>'stopInProgress'</code>               | The Bridgefy SDK is performing the stop process. ![iOS](assets/ios.svg) Only available for iOS.                          | 1.0.0 |
| **`DESTROY_SESSION_IN_PROGRESS`**     | <code>'destroySessionInProgress'</code>     | The Bridgefy SDK is destroying the current session. ![iOS](assets/ios.svg) Only available for iOS.                       | 1.0.0 |
| **`SERVICE_NOT_STARTED`**             | <code>'serviceNotStarted'</code>            | The Bridgefy SDK service is not started. ![iOS](assets/ios.svg) Only available for iOS.                                  | 1.0.0 |
| **`BLE_USAGE_NOT_GRANTED`**           | <code>'BLEUsageNotGranted'</code>           | The user does not allow the use of BLE. ![iOS](assets/ios.svg) Only available for iOS.                                   | 1.0.0 |
| **`BLE_USAGE_RESTRICTED`**            | <code>'BLEUsageRestricted'</code>           | The use of BLE in this device is restricted. ![iOS](assets/ios.svg) Only available for iOS.                              | 1.0.0 |
| **`BLE_POWERED_OFF`**                 | <code>'BLEPoweredOff'</code>                | The BLE antenna has been turned off. ![iOS](assets/ios.svg) Only available for iOS.                                      | 1.0.0 |
| **`BLE_UNSUPPORTED`**                 | <code>'BLEUnsupported'</code>               | The usage of BLE is not supported in the device. ![iOS](assets/ios.svg) Only available for iOS.                          | 1.0.0 |
| **`BLE_UNKNOWN_ERROR`**               | <code>'BLEUnknownError'</code>              | BLE usage failed with an unknown error. ![iOS](assets/ios.svg) Only available for iOS.                                   | 1.0.0 |
| **`INCONSISTENT_CONNECTION`**         | <code>'inconsistentConnection'</code>       |                                                                                                                          |       |
| **`CONNECTION_IS_ALREADY_SECURE`**    | <code>'connectionIsAlreadySecure'</code>    |                                                                                                                          |       |
| **`CANNOT_CREATE_SECURE_CONNECTION`** | <code>'cannotCreateSecureConnection'</code> |                                                                                                                          |       |
| **`DATA_LENGTH_EXCEEDED`**            | <code>'dataLengthExceeded'</code>           | The length of the data exceed the maximum limit. ![iOS](assets/ios.svg) Only available for iOS.                          | 1.0.0 |
| **`DATA_VALUE_IS_EMPTY`**             | <code>'dataValueIsEmpty'</code>             | The data to send is empty. ![iOS](assets/ios.svg) Only available for iOS.                                                | 1.0.0 |
| **`PEER_IS_NOT_CONNECTED`**           | <code>'peerIsNotConnected'</code>           | The requested peer is not connected. ![iOS](assets/ios.svg) Only available for iOS.                                      | 1.0.0 |
| **`INTERNAL_ERROR`**                  | <code>'internalError'</code>                | An internal error occurred. ![iOS](assets/ios.svg) Only available for iOS.                                               | 1.0.0 |
| **`LICENSE_ERROR`**                   | <code>'licenseError'</code>                 | An error occurred while validating the license. ![iOS](assets/ios.svg) Only available for iOS.                           | 1.0.0 |
| **`STORAGE_ERROR`**                   | <code>'storageError'</code>                 | An error occurred while storing data. ![iOS](assets/ios.svg) Only available for iOS.                                     | 1.0.0 |
| **`ENCODING_ERROR`**                  | <code>'encodingError'</code>                | An error occurred while encoding the message. ![iOS](assets/ios.svg) Only available for iOS.                             | 1.0.0 |
| **`ENCRYPTION_ERROR`**                | <code>'encryptionError'</code>              | An error occurred while encrypting the message. ![iOS](assets/ios.svg) Only available for iOS.                           | 1.0.0 |

</docgen-api>
