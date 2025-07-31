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
```

> ⚠️ **Warning**  
This key is required if your app uses APIs that access Bluetooth peripherals and has a deployment target earlier than iOS 13.

<docgen-config>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

These configuration values are available:

| Prop                 | Type                                  | Description                                                | Default            | Since |
| -------------------- | ------------------------------------- | ---------------------------------------------------------- | ------------------ | ----- |
| **`apiKey`**         | <code><a href="#uuid">UUID</a></code> | The API key for Bridgefy.                                  |                    | 0.0.1 |
| **`verboseLogging`** | <code>boolean</code>                  | If `true`, enables verbose logging for debugging purposes. | <code>false</code> | 0.0.1 |

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

| Param         | Type                                                            | Description                              |
| ------------- | --------------------------------------------------------------- | ---------------------------------------- |
| **`options`** | <code><a href="#initializeoptions">InitializeOptions</a></code> | The parameters to pass into this method. |

--------------------


### isInitialized()

```typescript
isInitialized() => Promise<IsInitializedResult>
```

Checks if the Bridgefy SDK has been initialized.

**Returns:** <code>Promise&lt;<a href="#isinitializedresult">IsInitializedResult</a>&gt;</code>

--------------------


### start(...)

```typescript
start(options: StartOptions) => Promise<void>
```

Starts Bridgefy operations, allowing the SDK to participate in the Bridgefy network.

| Param         | Type                                                  | Description                              |
| ------------- | ----------------------------------------------------- | ---------------------------------------- |
| **`options`** | <code><a href="#startoptions">StartOptions</a></code> | The parameters to pass into this method. |

--------------------


### isStarted()

```typescript
isStarted() => Promise<IsStartedResult>
```

Indicates whether the Bridgefy SDK is currently started.

**Returns:** <code>Promise&lt;<a href="#isstartedresult">IsStartedResult</a>&gt;</code>

--------------------


### stop()

```typescript
stop() => Promise<void>
```

Stops Bridgefy operations and releases associated resources.

--------------------


### licenseExpirationDate()

```typescript
licenseExpirationDate() => Promise<LicenseExpirationDateResult>
```

Retrieves the expiration date of the Bridgefy license.

**Returns:** <code>Promise&lt;<a href="#licenseexpirationdateresult">LicenseExpirationDateResult</a>&gt;</code>

--------------------


### updateLicense()

```typescript
updateLicense() => Promise<void>
```

Updates the Bridgefy license, if necessary.

--------------------


### destroySession()

```typescript
destroySession() => Promise<void>
```

Destroys the current session, terminating any active connections and cleaning up resources.

--------------------


### currentUserID()

```typescript
currentUserID() => Promise<UserIDResult>
```

Retrieves the <a href="#uuid">`UUID`</a> of the current Bridgefy user.

**Returns:** <code>Promise&lt;<a href="#useridresult">UserIDResult</a>&gt;</code>

--------------------


### connectedPeers()

```typescript
connectedPeers() => Promise<ConnectedPeersResult>
```

Retrieves a list of `UUID`s representing the connected peers in the current session.

**Returns:** <code>Promise&lt;<a href="#connectedpeersresult">ConnectedPeersResult</a>&gt;</code>

--------------------


### establishSecureConnection(...)

```typescript
establishSecureConnection(options: EstablishSecureConnectionOptions) => Promise<void>
```

Establishes a secure connection with the user.

| Param         | Type                                                                                          | Description                              |
| ------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **`options`** | <code><a href="#establishsecureconnectionoptions">EstablishSecureConnectionOptions</a></code> | The parameters to pass into this method. |

--------------------


### fingerprint(...)

```typescript
fingerprint(options: FingerprintOptions) => Promise<FingerprintResult>
```

Generates a fingerprint for the secure connection established with a specified user.

| Param         | Type                                                              | Description                              |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| **`options`** | <code><a href="#fingerprintoptions">FingerprintOptions</a></code> | The parameters to pass into this method. |

**Returns:** <code>Promise&lt;<a href="#fingerprintresult">FingerprintResult</a>&gt;</code>

--------------------


### isFingerprintValid(...)

```typescript
isFingerprintValid(options: IsFingerprintValidOptions) => Promise<IsFingerprintValidResult>
```

Verifies the validity of a fingerprint for a particular user.

| Param         | Type                                                                            | Description                              |
| ------------- | ------------------------------------------------------------------------------- | ---------------------------------------- |
| **`options`** | <code><a href="#isfingerprintvalidoptions">IsFingerprintValidOptions</a></code> | The parameters to pass into this method. |

**Returns:** <code>Promise&lt;<a href="#isfingerprintvalidresult">IsFingerprintValidResult</a>&gt;</code>

--------------------


### send(...)

```typescript
send(options: SendOptions) => Promise<SendResult>
```

Sends data using a specific transmission mode.

| Param         | Type                                                | Description                              |
| ------------- | --------------------------------------------------- | ---------------------------------------- |
| **`options`** | <code><a href="#sendoptions">SendOptions</a></code> | The parameters to pass into this method. |

**Returns:** <code>Promise&lt;<a href="#sendresult">SendResult</a>&gt;</code>

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Check for the appropriate permissions to use Nearby.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 0.0.1

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

**Since:** 0.0.1

--------------------


### addListener('onStarted', ...)

```typescript
addListener(eventName: 'onStarted', listenerFunc: (userID: UserID) => void) => Promise<PluginListenerHandle>
```

Initialization Listeners

| Param              | Type                                                       |
| ------------------ | ---------------------------------------------------------- |
| **`eventName`**    | <code>'onStarted'</code>                                   |
| **`listenerFunc`** | <code>(userID: <a href="#uuid">UUID</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailToStart', ...)

```typescript
addListener(eventName: 'onFailToStart', listenerFunc: (error: Error) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToStart'</code>                                |
| **`listenerFunc`** | <code>(error: <a href="#error">Error</a>) =&gt; void</code> |

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
addListener(eventName: 'onFailToStop', listenerFunc: (error: Error) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToStop'</code>                                 |
| **`listenerFunc`** | <code>(error: <a href="#error">Error</a>) =&gt; void</code> |

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
addListener(eventName: 'onFailToDestroySession', listenerFunc: (error: Error) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToDestroySession'</code>                       |
| **`listenerFunc`** | <code>(error: <a href="#error">Error</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onConnected', ...)

```typescript
addListener(eventName: 'onConnected', listenerFunc: (peerID: PeerID) => void) => Promise<PluginListenerHandle>
```

When a peer has established connection

| Param              | Type                                                       |
| ------------------ | ---------------------------------------------------------- |
| **`eventName`**    | <code>'onConnected'</code>                                 |
| **`listenerFunc`** | <code>(peerID: <a href="#uuid">UUID</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onDisconnected', ...)

```typescript
addListener(eventName: 'onDisconnected', listenerFunc: (peerID: PeerID) => void) => Promise<PluginListenerHandle>
```

When a peer is disconnected (out of range)

| Param              | Type                                                       |
| ------------------ | ---------------------------------------------------------- |
| **`eventName`**    | <code>'onDisconnected'</code>                              |
| **`listenerFunc`** | <code>(peerID: <a href="#uuid">UUID</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onConnectedPeers', ...)

```typescript
addListener(eventName: 'onConnectedPeers', listenerFunc: (connectedPeers: PeerID[]) => void) => Promise<PluginListenerHandle>
```

When a device is detected, notifies the list of connected users

Note: Android only.

| Param              | Type                                             |
| ------------------ | ------------------------------------------------ |
| **`eventName`**    | <code>'onConnectedPeers'</code>                  |
| **`listenerFunc`** | <code>(connectedPeers: UUID[]) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onEstablishSecureConnection', ...)

```typescript
addListener(eventName: 'onEstablishSecureConnection', listenerFunc: (userID: UserID) => void) => Promise<PluginListenerHandle>
```

When an on-demand secure connection was successfully established

| Param              | Type                                                       |
| ------------------ | ---------------------------------------------------------- |
| **`eventName`**    | <code>'onEstablishSecureConnection'</code>                 |
| **`listenerFunc`** | <code>(userID: <a href="#uuid">UUID</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailToEstablishSecureConnection', ...)

```typescript
addListener(eventName: 'onFailToEstablishSecureConnection', listenerFunc: (userID: UserID, error: Error) => void) => Promise<PluginListenerHandle>
```

When an on-demand secure connection failed to establish

| Param              | Type                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToEstablishSecureConnection'</code>                                              |
| **`listenerFunc`** | <code>(userID: <a href="#uuid">UUID</a>, error: <a href="#error">Error</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onSend', ...)

```typescript
addListener(eventName: 'onSend', listenerFunc: (messageID: MessageID) => void) => Promise<PluginListenerHandle>
```

When a message is sent

| Param              | Type                                                          |
| ------------------ | ------------------------------------------------------------- |
| **`eventName`**    | <code>'onSend'</code>                                         |
| **`listenerFunc`** | <code>(messageID: <a href="#uuid">UUID</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailToSend', ...)

```typescript
addListener(eventName: 'onFailToSend', listenerFunc: (messageID: MessageID, error: Error) => void) => Promise<PluginListenerHandle>
```

When a message fails to send

| Param              | Type                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'onFailToSend'</code>                                                                      |
| **`listenerFunc`** | <code>(messageID: <a href="#uuid">UUID</a>, error: <a href="#error">Error</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onProgressOfSend', ...)

```typescript
addListener(eventName: 'onProgressOfSend', listenerFunc: (messageID: MessageID, position: number, total: number) => void) => Promise<PluginListenerHandle>
```

When sending progress update

Note: Android only.

| Param              | Type                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onProgressOfSend'</code>                                                                |
| **`listenerFunc`** | <code>(messageID: <a href="#uuid">UUID</a>, position: number, total: number) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onReceiveData', ...)

```typescript
addListener(eventName: 'onReceiveData', listenerFunc: (messageID: MessageID, data: Base64, transmissionMode: TransmissionMode) => void) => Promise<PluginListenerHandle>
```

When data is received

| Param              | Type                                                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onReceiveData'</code>                                                                                                                                          |
| **`listenerFunc`** | <code>(messageID: <a href="#uuid">UUID</a>, data: <a href="#base64">Base64</a>, transmissionMode: <a href="#transmissionmode">TransmissionMode</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Removes all listeners

--------------------


### Interfaces


#### InitializeOptions

| Prop                 | Type                                  | Description                                                |
| -------------------- | ------------------------------------- | ---------------------------------------------------------- |
| **`apiKey`**         | <code><a href="#uuid">UUID</a></code> | The API key for Bridgefy.                                  |
| **`verboseLogging`** | <code>boolean</code>                  | If `true`, enables verbose logging for debugging purposes. |


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

| Prop                        | Type                                  | Description                                                                                                   |
| --------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`licenseExpirationDate`** | <code><a href="#date">Date</a></code> | The expiration date as a <a href="#date">Date</a> object or null if the license information is not available. |


#### Date

Enables basic storage and retrieval of dates and times.

| Method                 | Signature                                                                                                    | Description                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **toString**           | () =&gt; string                                                                                              | Returns a string representation of a date. The format of the string depends on the locale.                                              |
| **toDateString**       | () =&gt; string                                                                                              | Returns a date as a string value.                                                                                                       |
| **toTimeString**       | () =&gt; string                                                                                              | Returns a time as a string value.                                                                                                       |
| **toLocaleString**     | () =&gt; string                                                                                              | Returns a value as a string value appropriate to the host environment's current locale.                                                 |
| **toLocaleDateString** | () =&gt; string                                                                                              | Returns a date as a string value appropriate to the host environment's current locale.                                                  |
| **toLocaleTimeString** | () =&gt; string                                                                                              | Returns a time as a string value appropriate to the host environment's current locale.                                                  |
| **valueOf**            | () =&gt; number                                                                                              | Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC.                                                      |
| **getTime**            | () =&gt; number                                                                                              | Gets the time value in milliseconds.                                                                                                    |
| **getFullYear**        | () =&gt; number                                                                                              | Gets the year, using local time.                                                                                                        |
| **getUTCFullYear**     | () =&gt; number                                                                                              | Gets the year using Universal Coordinated Time (UTC).                                                                                   |
| **getMonth**           | () =&gt; number                                                                                              | Gets the month, using local time.                                                                                                       |
| **getUTCMonth**        | () =&gt; number                                                                                              | Gets the month of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                             |
| **getDate**            | () =&gt; number                                                                                              | Gets the day-of-the-month, using local time.                                                                                            |
| **getUTCDate**         | () =&gt; number                                                                                              | Gets the day-of-the-month, using Universal Coordinated Time (UTC).                                                                      |
| **getDay**             | () =&gt; number                                                                                              | Gets the day of the week, using local time.                                                                                             |
| **getUTCDay**          | () =&gt; number                                                                                              | Gets the day of the week using Universal Coordinated Time (UTC).                                                                        |
| **getHours**           | () =&gt; number                                                                                              | Gets the hours in a date, using local time.                                                                                             |
| **getUTCHours**        | () =&gt; number                                                                                              | Gets the hours value in a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                       |
| **getMinutes**         | () =&gt; number                                                                                              | Gets the minutes of a <a href="#date">Date</a> object, using local time.                                                                |
| **getUTCMinutes**      | () =&gt; number                                                                                              | Gets the minutes of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                           |
| **getSeconds**         | () =&gt; number                                                                                              | Gets the seconds of a <a href="#date">Date</a> object, using local time.                                                                |
| **getUTCSeconds**      | () =&gt; number                                                                                              | Gets the seconds of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                           |
| **getMilliseconds**    | () =&gt; number                                                                                              | Gets the milliseconds of a <a href="#date">Date</a>, using local time.                                                                  |
| **getUTCMilliseconds** | () =&gt; number                                                                                              | Gets the milliseconds of a <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                      |
| **getTimezoneOffset**  | () =&gt; number                                                                                              | Gets the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC).                             |
| **setTime**            | (time: number) =&gt; number                                                                                  | Sets the date and time value in the <a href="#date">Date</a> object.                                                                    |
| **setMilliseconds**    | (ms: number) =&gt; number                                                                                    | Sets the milliseconds value in the <a href="#date">Date</a> object using local time.                                                    |
| **setUTCMilliseconds** | (ms: number) =&gt; number                                                                                    | Sets the milliseconds value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                              |
| **setSeconds**         | (sec: number, ms?: number \| undefined) =&gt; number                                                         | Sets the seconds value in the <a href="#date">Date</a> object using local time.                                                         |
| **setUTCSeconds**      | (sec: number, ms?: number \| undefined) =&gt; number                                                         | Sets the seconds value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                   |
| **setMinutes**         | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | Sets the minutes value in the <a href="#date">Date</a> object using local time.                                                         |
| **setUTCMinutes**      | (min: number, sec?: number \| undefined, ms?: number \| undefined) =&gt; number                              | Sets the minutes value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                   |
| **setHours**           | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | Sets the hour value in the <a href="#date">Date</a> object using local time.                                                            |
| **setUTCHours**        | (hours: number, min?: number \| undefined, sec?: number \| undefined, ms?: number \| undefined) =&gt; number | Sets the hours value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                     |
| **setDate**            | (date: number) =&gt; number                                                                                  | Sets the numeric day-of-the-month value of the <a href="#date">Date</a> object using local time.                                        |
| **setUTCDate**         | (date: number) =&gt; number                                                                                  | Sets the numeric day of the month in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                        |
| **setMonth**           | (month: number, date?: number \| undefined) =&gt; number                                                     | Sets the month value in the <a href="#date">Date</a> object using local time.                                                           |
| **setUTCMonth**        | (month: number, date?: number \| undefined) =&gt; number                                                     | Sets the month value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                     |
| **setFullYear**        | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | Sets the year of the <a href="#date">Date</a> object using local time.                                                                  |
| **setUTCFullYear**     | (year: number, month?: number \| undefined, date?: number \| undefined) =&gt; number                         | Sets the year value in the <a href="#date">Date</a> object using Universal Coordinated Time (UTC).                                      |
| **toUTCString**        | () =&gt; string                                                                                              | Returns a date converted to a string using Universal Coordinated Time (UTC).                                                            |
| **toISOString**        | () =&gt; string                                                                                              | Returns a date as a string value in ISO format.                                                                                         |
| **toJSON**             | (key?: any) =&gt; string                                                                                     | Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization. |


#### UserIDResult

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


#### Error

| Prop          | Type                |
| ------------- | ------------------- |
| **`name`**    | <code>string</code> |
| **`message`** | <code>string</code> |
| **`stack`**   | <code>string</code> |


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


#### TransmissionMode

There are several modes for sending packets:

- **Broadcast**  
Sends a packet using mesh without a defined receiver. The packet is broadcast to all nearby users that are in range, who then broadcast it to all receivers that are in their range, and so on. If a user isn't in range, the packet will be delivered the next time said user comes within range of another user who did receive the packet. Broadcast messages can be read by all nodes that receive it.
- **Mesh**  
Sends the packet using mesh to only once receiver. It doesn't need the receiver to be in range. Receiver can be in range of a third receiver located within range of both sender and receiver at the same time, or receiver can be out of range of all other nodes, but eventually come within range of a node that at some point received the packet. Mesh messages can be received by multiple nodes, but can only be read by the intended receiver.
- **P2P**  
Sends the packet only when the receiver is in range.

<code>{ type: <a href="#transmissiontype">TransmissionType</a>; uuid: <a href="#uuid">UUID</a>; }</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### PermissionType

<code>'bluetooth' | 'location'</code>


### Enums


#### PropagationProfile

| Members                        | Value                                 |
| ------------------------------ | ------------------------------------- |
| **`STANDARD`**                 | <code>'standard'</code>               |
| **`HIGH_DENSITY_ENVIRONMENT`** | <code>'highDensityEnvironment'</code> |
| **`SPARSE_ENVIRONMENT`**       | <code>'sparseEnvironment'</code>      |
| **`LONG_REACH`**               | <code>'longReach'</code>              |
| **`SHORT_REACH`**              | <code>'shortReach'</code>             |


#### TransmissionType

| Members         | Value                    | Description                                                                                                           |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **`BROADCAST`** | <code>'broadcast'</code> | Broadcast type propagate message on mesh network                                                                      |
| **`MESH`**      | <code>'mesh'</code>      | Mesh type propagate message and find receiver on mesh network                                                         |
| **`P2P`**       | <code>'p2p'</code>       | Direct type allow direct message and if receiver isn't connected, the SDK change and propagate message with Mesh type |

</docgen-api>
