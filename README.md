# @capacitor-trancee/bridgefy

Make your mobile app work without the Internet

## Install

```bash
npm install @capacitor-trancee/bridgefy
npx cap sync
```

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`isInitialized()`](#isinitialized)
* [`stop()`](#stop)
* [`start(...)`](#start)
* [`isStarted()`](#isstarted)
* [`licenseExpirationDate()`](#licenseexpirationdate)
* [`updateLicense()`](#updatelicense)
* [`destroySession()`](#destroysession)
* [`currentUserID()`](#currentuserid)
* [`connectedPeers()`](#connectedpeers)
* [`send(...)`](#send)
* [`addListener('onFailToStart', ...)`](#addlisteneronfailtostart-)
* [`addListener('onStarted', ...)`](#addlisteneronstarted-)
* [`addListener('onFailToStop', ...)`](#addlisteneronfailtostop-)
* [`addListener('onStopped', ...)`](#addlisteneronstopped-)
* [`addListener('onDestroySession', ...)`](#addlistenerondestroysession-)
* [`addListener('onFailToDestroySession', ...)`](#addlisteneronfailtodestroysession-)
* [`addListener('onConnected', ...)`](#addlisteneronconnected-)
* [`addListener('onDisconnected', ...)`](#addlistenerondisconnected-)
* [`addListener('onConnectedPeers', ...)`](#addlisteneronconnectedpeers-)
* [`addListener('onEstablishSecureConnection', ...)`](#addlisteneronestablishsecureconnection-)
* [`addListener('onFailToEstablishSecureConnection', ...)`](#addlisteneronfailtoestablishsecureconnection-)
* [`addListener('onSend', ...)`](#addlisteneronsend-)
* [`addListener('onProgressOfSend', ...)`](#addlisteneronprogressofsend-)
* [`addListener('onFailToSend', ...)`](#addlisteneronfailtosend-)
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

This method is asynchronous and returns a promise that resolves when the initialization is complete.

| Param         | Type                                                            | Description                                |
| ------------- | --------------------------------------------------------------- | ------------------------------------------ |
| **`options`** | <code><a href="#initializeoptions">InitializeOptions</a></code> | - The parameters to pass into this method. |

--------------------


### isInitialized()

```typescript
isInitialized() => Promise<boolean>
```

Checks if the Bridgefy SDK has been initialized.

**Returns:** <code>Promise&lt;boolean&gt;</code>

--------------------


### stop()

```typescript
stop() => Promise<void>
```

Stops Bridgefy operations and releases associated resources.

--------------------


### start(...)

```typescript
start(options: StartOptions) => Promise<void>
```

Starts Bridgefy operations, allowing the SDK to participate in the Bridgefy network.

| Param         | Type                                                  | Description                                |
| ------------- | ----------------------------------------------------- | ------------------------------------------ |
| **`options`** | <code><a href="#startoptions">StartOptions</a></code> | - The parameters to pass into this method. |

--------------------


### isStarted()

```typescript
isStarted() => Promise<boolean>
```

Indicates whether the Bridgefy SDK is currently started.

**Returns:** <code>Promise&lt;boolean&gt;</code>

--------------------


### licenseExpirationDate()

```typescript
licenseExpirationDate() => Promise<ExpirationDateResult>
```

Retrieves the expiration date of the Bridgefy license.

**Returns:** <code>Promise&lt;<a href="#expirationdateresult">ExpirationDateResult</a>&gt;</code>

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

Retrieves the <a href="#uuid">UUID</a> of the current Bridgefy user.

**Returns:** <code>Promise&lt;<a href="#useridresult">UserIDResult</a>&gt;</code>

--------------------


### connectedPeers()

```typescript
connectedPeers() => Promise<ConnectedPeersResult>
```

Retrieves a list of UUIDs representing the connected peers in the current session.

**Returns:** <code>Promise&lt;<a href="#connectedpeersresult">ConnectedPeersResult</a>&gt;</code>

--------------------


### send(...)

```typescript
send(options: SendOptions) => Promise<SendResult>
```

Sends data using a specific transmission mode.

| Param         | Type                                                | Description                                |
| ------------- | --------------------------------------------------- | ------------------------------------------ |
| **`options`** | <code><a href="#sendoptions">SendOptions</a></code> | - The parameters to pass into this method. |

**Returns:** <code>Promise&lt;<a href="#sendresult">SendResult</a>&gt;</code>

--------------------


### addListener('onFailToStart', ...)

```typescript
addListener(eventName: 'onFailToStart', listenerFunc: (error: BridgefyException) => void) => Promise<PluginListenerHandle>
```

Initialization Listeners

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToStart'</code>                                                        |
| **`listenerFunc`** | <code>(error: <a href="#bridgefyexception">BridgefyException</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onStarted', ...)

```typescript
addListener(eventName: 'onStarted', listenerFunc: (userID: UUID) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                     |
| ------------------ | ---------------------------------------- |
| **`eventName`**    | <code>'onStarted'</code>                 |
| **`listenerFunc`** | <code>(userID: string) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailToStop', ...)

```typescript
addListener(eventName: 'onFailToStop', listenerFunc: (error: BridgefyException) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToStop'</code>                                                         |
| **`listenerFunc`** | <code>(error: <a href="#bridgefyexception">BridgefyException</a>) =&gt; void</code> |

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
addListener(eventName: 'onFailToDestroySession', listenerFunc: (error: BridgefyException) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToDestroySession'</code>                                               |
| **`listenerFunc`** | <code>(error: <a href="#bridgefyexception">BridgefyException</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onConnected', ...)

```typescript
addListener(eventName: 'onConnected', listenerFunc: (peerID: UUID) => void) => Promise<PluginListenerHandle>
```

When a peer has established connection

| Param              | Type                                     |
| ------------------ | ---------------------------------------- |
| **`eventName`**    | <code>'onConnected'</code>               |
| **`listenerFunc`** | <code>(peerID: string) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onDisconnected', ...)

```typescript
addListener(eventName: 'onDisconnected', listenerFunc: (peerID: UUID) => void) => Promise<PluginListenerHandle>
```

When a peer is disconnected (out of range)

| Param              | Type                                     |
| ------------------ | ---------------------------------------- |
| **`eventName`**    | <code>'onDisconnected'</code>            |
| **`listenerFunc`** | <code>(peerID: string) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onConnectedPeers', ...)

```typescript
addListener(eventName: 'onConnectedPeers', listenerFunc: (connectedPeers: UUID[]) => void) => Promise<PluginListenerHandle>
```

When a device is detected, notifies the list of connected users

| Param              | Type                                               |
| ------------------ | -------------------------------------------------- |
| **`eventName`**    | <code>'onConnectedPeers'</code>                    |
| **`listenerFunc`** | <code>(connectedPeers: string[]) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onEstablishSecureConnection', ...)

```typescript
addListener(eventName: 'onEstablishSecureConnection', listenerFunc: (userID: UUID) => void) => Promise<PluginListenerHandle>
```

When an on-demand secure connection was successfully established

| Param              | Type                                       |
| ------------------ | ------------------------------------------ |
| **`eventName`**    | <code>'onEstablishSecureConnection'</code> |
| **`listenerFunc`** | <code>(userID: string) =&gt; void</code>   |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailToEstablishSecureConnection', ...)

```typescript
addListener(eventName: 'onFailToEstablishSecureConnection', listenerFunc: (userID: UUID, error: BridgefyException) => void) => Promise<PluginListenerHandle>
```

When an on-demand secure connection failed to establish

| Param              | Type                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onFailToEstablishSecureConnection'</code>                                                    |
| **`listenerFunc`** | <code>(userID: string, error: <a href="#bridgefyexception">BridgefyException</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onSend', ...)

```typescript
addListener(eventName: 'onSend', listenerFunc: (messageID: UUID) => void) => Promise<PluginListenerHandle>
```

When a message is sent

| Param              | Type                                        |
| ------------------ | ------------------------------------------- |
| **`eventName`**    | <code>'onSend'</code>                       |
| **`listenerFunc`** | <code>(messageID: string) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onProgressOfSend', ...)

```typescript
addListener(eventName: 'onProgressOfSend', listenerFunc: (messageID: UUID, position: number, total: number) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onProgressOfSend'</code>                                              |
| **`listenerFunc`** | <code>(messageID: string, position: number, total: number) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailToSend', ...)

```typescript
addListener(eventName: 'onFailToSend', listenerFunc: (messageID: UUID, error: BridgefyException) => void) => Promise<PluginListenerHandle>
```

When a message fails to send

| Param              | Type                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **`eventName`**    | <code>'onFailToSend'</code>                                                                            |
| **`listenerFunc`** | <code>(messageID: string, error: <a href="#bridgefyexception">BridgefyException</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onReceiveData', ...)

```typescript
addListener(eventName: 'onReceiveData', listenerFunc: (data: Base64, messageID: UUID, transmissionMode: TransmissionMode) => void) => Promise<PluginListenerHandle>
```

When data is received

| Param              | Type                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onReceiveData'</code>                                                                                                  |
| **`listenerFunc`** | <code>(data: string, messageID: string, transmissionMode: <a href="#transmissionmode">TransmissionMode</a>) =&gt; void</code> |

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

| Prop                 | Type                                  | Description                                                                   |
| -------------------- | ------------------------------------- | ----------------------------------------------------------------------------- |
| **`apiKey`**         | <code><a href="#uuid">UUID</a></code> | The API key for Bridgefy.                                                     |
| **`verboseLogging`** | <code>boolean</code>                  | If true, enables verbose logging for debugging purposes. Defaults to `false`. |


#### StartOptions

| Prop                     | Type                                                              | Description                                                                                                                                                          |
| ------------------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`userID`**             | <code><a href="#uuid">UUID</a></code>                             | The ID used to identify the user in the Bridgefy network. If not provided, a new user ID will be generated.                                                          |
| **`propagationProfile`** | <code><a href="#propagationprofile">PropagationProfile</a></code> | A profile that defines a series of properties and rules for the propagation of messages. Defaults to <a href="#propagationprofile">`PropagationProfile</a>.DEFAULT`. |


#### ExpirationDateResult

| Prop                 | Type                |
| -------------------- | ------------------- |
| **`expirationDate`** | <code>string</code> |


#### UserIDResult

| Prop         | Type                                  |
| ------------ | ------------------------------------- |
| **`userID`** | <code><a href="#uuid">UUID</a></code> |


#### ConnectedPeersResult

| Prop        | Type                  |
| ----------- | --------------------- |
| **`peers`** | <code>string[]</code> |


#### SendResult

| Prop            | Type                                  |
| --------------- | ------------------------------------- |
| **`messageID`** | <code><a href="#uuid">UUID</a></code> |


#### SendOptions

| Prop                   | Type                                                          |
| ---------------------- | ------------------------------------------------------------- |
| **`data`**             | <code><a href="#base64">Base64</a></code>                     |
| **`transmissionMode`** | <code><a href="#transmissionmode">TransmissionMode</a></code> |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### UUID

<code>string</code>


#### Base64

<code>string</code>


#### TransmissionMode

There are several modes for sending packets:

**Broadcast**: Sends a packet using mesh without a defined receiver. The packet is broadcast to all nearby users that are in range, who then broadcast it to all receivers that are in their range, and so on. If a user isn't in range, the packet will be delivered the next time said user comes within range of another user who did receive the packet. Broadcast messages can be read by all nodes that receive it.
**Mesh**: Sends the packet using mesh to only once receiver. It doesn't need the receiver to be in range. Receiver can be in range of a third receiver located within range of both sender and receiver at the same time, or receiver can be out of range of all other nodes, but eventually come within range of a node that at some point received the packet. Mesh messages can be received by multiple nodes, but can only be read by the intended receiver.
**P2P**: Sends the packet only when the receiver is in range.

<code>{ type: <a href="#transmissiontype">TransmissionType.BROADCAST</a>, senderID: <a href="#uuid">UUID</a>; } | { type: <a href="#transmissiontype">TransmissionType.MESH</a>, receiverID: <a href="#uuid">UUID</a>; } | { type: <a href="#transmissiontype">TransmissionType.P2P</a>, receiverID: <a href="#uuid">UUID</a>; }</code>


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


#### BridgefyException

| Members                            | Value                                     |
| ---------------------------------- | ----------------------------------------- |
| **`ALREADY_STARTED`**              | <code>'alreadyStarted'</code>             |
| **`DEVICE_CAPABILITIES`**          | <code>'deviceCapabilities'</code>         |
| **`EXPIRED_LICENSE`**              | <code>'expiredLicense'</code>             |
| **`GENERIC`**                      | <code>'generic'</code>                    |
| **`INCONSISTENT_DEVICE_TIME`**     | <code>'inconsistentDeviceTime'</code>     |
| **`INTERNET_CONNECTION_REQUIRED`** | <code>'internetConnectionRequired'</code> |
| **`INVALID_API_KEY_FORMAT`**       | <code>'invalidAPIKeyFormat'</code>        |
| **`MISSING_APPLICATION_ID`**       | <code>'missingApplicationID'</code>       |
| **`PERMISSION`**                   | <code>'permission'</code>                 |
| **`REGISTRATION`**                 | <code>'registration'</code>               |
| **`SESSION_ERROR`**                | <code>'sessionError'</code>               |
| **`SIMULATOR_IS_NOT_SUPPORTED`**   | <code>'simulatorIsNotSupported'</code>    |
| **`SIZE_LIMIT_EXCEEDED`**          | <code>'sizeLimitExceeded'</code>          |
| **`UNKNOWN`**                      | <code>'unknown'</code>                    |

</docgen-api>
