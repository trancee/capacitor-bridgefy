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
* [`stop()`](#stop)
* [`start(...)`](#start)
* [`licenseExpirationDate()`](#licenseexpirationdate)
* [`updateLicense()`](#updatelicense)
* [`destroySession()`](#destroysession)
* [`isStarted()`](#isstarted)
* [`currentUserId()`](#currentuserid)
* [`connectedPeers()`](#connectedpeers)
* [`send(...)`](#send)
* [`addListener('onConnected', ...)`](#addlisteneronconnected-)
* [`addListener('onDisconnected', ...)`](#addlistenerondisconnected-)
* [`addListener('onConnectedPeers', ...)`](#addlisteneronconnectedpeers-)
* [`addListener('onSend', ...)`](#addlisteneronsend-)
* [`addListener('onFailToSend', ...)`](#addlisteneronfailtosend-)
* [`addListener('onReceiveData', ...)`](#addlisteneronreceivedata-)
* [`addListener('onEstablishSecureConnection', ...)`](#addlisteneronestablishsecureconnection-)
* [`addListener('onFailToEstablishSecureConnection', ...)`](#addlisteneronfailtoestablishsecureconnection-)
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


### isStarted()

```typescript
isStarted() => Promise<boolean>
```

Indicates whether the Bridgefy SDK is currently started.

**Returns:** <code>Promise&lt;boolean&gt;</code>

--------------------


### currentUserId()

```typescript
currentUserId() => Promise<UserIdResult>
```

Retrieves the <a href="#uuid">UUID</a> of the current Bridgefy user.

**Returns:** <code>Promise&lt;<a href="#useridresult">UserIdResult</a>&gt;</code>

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


### addListener('onFailToSend', ...)

```typescript
addListener(eventName: 'onFailToSend', listenerFunc: (messageID: UUID) => void) => Promise<PluginListenerHandle>
```

When a message fails to send

| Param              | Type                                        |
| ------------------ | ------------------------------------------- |
| **`eventName`**    | <code>'onFailToSend'</code>                 |
| **`listenerFunc`** | <code>(messageID: string) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onReceiveData', ...)

```typescript
addListener(eventName: 'onReceiveData', listenerFunc: (data: any, messageID: UUID, transmissionMode: TransmissionMode) => void) => Promise<PluginListenerHandle>
```

When data is received

| Param              | Type                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onReceiveData'</code>                                                                                               |
| **`listenerFunc`** | <code>(data: any, messageID: string, transmissionMode: <a href="#transmissionmode">TransmissionMode</a>) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onEstablishSecureConnection', ...)

```typescript
addListener(eventName: 'onEstablishSecureConnection', listenerFunc: (userId: UUID) => void) => Promise<PluginListenerHandle>
```

When an on-demand secure connection was successfully established

| Param              | Type                                       |
| ------------------ | ------------------------------------------ |
| **`eventName`**    | <code>'onEstablishSecureConnection'</code> |
| **`listenerFunc`** | <code>(userId: string) =&gt; void</code>   |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### addListener('onFailToEstablishSecureConnection', ...)

```typescript
addListener(eventName: 'onFailToEstablishSecureConnection', listenerFunc: (userId: UUID, error: any) => void) => Promise<PluginListenerHandle>
```

When an on-demand secure connection failed to establish

| Param              | Type                                                 |
| ------------------ | ---------------------------------------------------- |
| **`eventName`**    | <code>'onFailToEstablishSecureConnection'</code>     |
| **`listenerFunc`** | <code>(userId: string, error: any) =&gt; void</code> |

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
| **`userId`**             | <code><a href="#uuid">UUID</a></code>                             | The ID used to identify the user in the Bridgefy network. If not provided, a new user ID will be generated.                                                          |
| **`propagationProfile`** | <code><a href="#propagationprofile">PropagationProfile</a></code> | A profile that defines a series of properties and rules for the propagation of messages. Defaults to <a href="#propagationprofile">`PropagationProfile.DEFAULT`</a>. |


#### ExpirationDateResult

| Prop                 | Type                |
| -------------------- | ------------------- |
| **`expirationDate`** | <code>string</code> |


#### UserIdResult

| Prop         | Type                                  |
| ------------ | ------------------------------------- |
| **`userId`** | <code><a href="#uuid">UUID</a></code> |


#### ConnectedPeersResult

| Prop        | Type                  |
| ----------- | --------------------- |
| **`peers`** | <code>string[]</code> |


#### SendResult

| Prop            | Type                                  |
| --------------- | ------------------------------------- |
| **`messageId`** | <code><a href="#uuid">UUID</a></code> |


#### SendOptions

| Prop                   | Type                                                          |
| ---------------------- | ------------------------------------------------------------- |
| **`data`**             | <code>Base64URLString</code>                                  |
| **`transmissionMode`** | <code><a href="#transmissionmode">TransmissionMode</a></code> |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### UUID

<code>string</code>


### Enums


#### PropagationProfile

| Members       | Value                  |
| ------------- | ---------------------- |
| **`DEFAULT`** | <code>'default'</code> |


#### TransmissionMode

| Members         | Value                    | Description                                                                                                           |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **`BROADCAST`** | <code>'broadcast'</code> | Broadcast type propagate message on mesh network                                                                      |
| **`MESH`**      | <code>'mesh'</code>      | Mesh type propagate message and find receiver on mesh network                                                         |
| **`P2P`**       | <code>'p2p'</code>       | Direct type allow direct message and if receiver isn't connected, the SDK change and propagate message with Mesh type |

</docgen-api>
