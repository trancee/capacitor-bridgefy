window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      Capacitor.Plugins.SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor</h1>
      </capacitor-welcome-titlebar>
      <main>
        <fieldset title="Name"><legend>Name</legend>
          <input type="text" value="BEACON#1" id="beacon-name" style="width: 100%"></input>
          <button class="button" id="initialize">Initialize</button>
          <p>
            <button class="button" disabled id="start">Start</button>
            <button class="button" disabled id="stop">Stop</button>

            <button class="button" disabled id="pause">Pause</button>
            <button class="button" disabled id="resume">Resume</button>
          </p>
        </fieldset>
        <hr>
        <fieldset title="Messages"><legend>Messages</legend>
          <p>
            <button class="button" id="broadcast-message">Send Broadcast Message</button>
            <button class="button" id="direct-message">Send Direct Message</button>
          </p>

          <fieldset title="Devices"><legend>Devices</legend>
            <select id="devices" size=5 multiple style="width: 100%"></select>
          </fieldset>
          <p>
          <fieldset title="Logs"><legend>Logs</legend>
            <textarea id="log" rows=10 disabled readonly style="width: 100%; font-size: 75%;"></textarea>
          </fieldset>
        </fieldset>
        <hr>
        <fieldset title="Photo"><legend>Photo</legend>
          <p>
            <button class="button" id="take-photo">Take Photo</button>
          </p>
          <p style="background-color: silver;">
            <img id="image" style="max-width: 100%">
          </p>
        </fieldset>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;

      const API_KEY = '10b5393d-6f99-46f2-9350-138378f0ae48';

      const { Bridgefy } = Capacitor.Plugins;

      self.shadowRoot
        .querySelector('#initialize')
        .addEventListener('click', async function (e) {
          try {
            const result = await Bridgefy.initialize({
              // apiKey: API_KEY,

              debug: true,
            });
            console.log(result);
            self.log('initialize', result);
          } catch (e) {
            console.warn('User cancelled', e);
          }
        });

      self.shadowRoot
        .querySelector('#start')
        .addEventListener('click', async function (e) {
          const {
            Antenna,
            BFEnergyProfile,
            BFBleProfile,
            BFEngineProfile,
          } = capacitorBridgefy;

          try {
            const result = await Bridgefy.start({
              // config: {
              //   maxConnectionRetries: 5,

              //   antennaType: Antenna.BLUETOOTH_LE,

              //   autoConnect: true,

              //   energyProfile: BFEnergyProfile.BALANCED,
              //   bleProfile: BFBleProfile.EXTENDED_RANGE,
              //   engineProfile: BFEngineProfile.LONG_REACH,
              // },
            });
            console.log(result);
            self.log('start', result);
          } catch (e) {
            console.warn('User cancelled', e);
          }
        });

      self.shadowRoot
        .querySelector('#stop')
        .addEventListener('click', async function (e) {
          try {
            const result = await Bridgefy.stop();
            console.log(result);
            self.log('stop', result);
          } catch (e) {
            console.warn('User cancelled', e);
          }
        });

      self.shadowRoot
        .querySelector('#pause')
        .addEventListener('click', async function (e) {
          try {
            const result = await Bridgefy.pause();
            console.log(result);
            self.log('pause', result);
          } catch (e) {
            console.warn('User cancelled', e);
          }
        });

      self.shadowRoot
        .querySelector('#resume')
        .addEventListener('click', async function (e) {
          try {
            const result = await Bridgefy.resume();
            console.log(result);
            self.log('resume', result);
          } catch (e) {
            console.warn('User cancelled', e);
          }
        });

      self.shadowRoot
        .querySelector('#broadcast-message')
        .addEventListener('click', async function (e) {
          try {
            const message = {
              content: {
                name: 'Yoshi',
                gender: 'MALE',
                age: 45,
              },
              data: exports.encode(
                new TextEncoder().encode('Hello world.').buffer,
              ),
            };

            const result = await Bridgefy.sendBroadcastMessage({
              message: message,
            });
            console.log(result);
            self.log('sendBroadcastMessage', result);
          } catch (e) {
            console.warn('User cancelled', e);
          }
        });

      self.shadowRoot
        .querySelector('#direct-message')
        .addEventListener('click', async function (e) {
          try {
            const field = self.shadowRoot.querySelector('#devices');
            const option = field.options[0];

            const message = {
              content: {
                name: 'Yoshi',
                gender: 'MALE',
                age: 45,
              },
              data: exports.encode(
                new TextEncoder().encode('Hello world.').buffer,
              ),
              receiverId: option.text,
            };

            const result = await Bridgefy.sendMessage({
              message: message,
            });
            console.log(result);
            self.log('sendMessage', result);
          } catch (e) {
            console.warn('User cancelled', e);
          }
        });

      self.shadowRoot
        .querySelector('#take-photo')
        .addEventListener('click', async function (e) {
          const { Camera } = Capacitor.Plugins;

          try {
            const photo = await Camera.getPhoto({
              resultType: 'uri',
            });

            const image = self.shadowRoot.querySelector('#image');
            if (!image) {
              return;
            }

            image.src = photo.webPath;
          } catch (e) {
            console.warn('User cancelled', e);
          }
        });

      self.clearDevices = function () {
        const field = self.shadowRoot.querySelector('#devices');
        while (field.options.length) {
          field.remove(0);
        }
      };

      self.removeDevice = function (id) {
        const field = self.shadowRoot.querySelector('#devices');
        let option = field.namedItem(id);
        if (option) {
          field.remove(option.index);
        }
      };

      self.addDevice = function (id, name) {
        const field = self.shadowRoot.querySelector('#devices');
        let option = document.createElement('option');
        option.id = id;
        option.value = id;
        option.text = name;
        option.selected = true;
        field.add(option);
      };

      self.log = function (method, result) {
        const field = self.shadowRoot.querySelector('#log');
        field.value +=
          new Date().toTimeString().split(' ')[0] +
          ' ' +
          method +
          '=' +
          (result === undefined ? '' : JSON.stringify(result)) +
          '\n';
        field.scrollTop = field.scrollHeight;
      };

      self.onRegistrationSuccessful = Bridgefy.addListener(
        'onRegistrationSuccessful',
        data => {
          console.log('onRegistrationSuccessful', data);
          self.log('onRegistrationSuccessful', data);

          self.shadowRoot.querySelector('#start').disabled = false;
          self.shadowRoot.querySelector('#stop').disabled = false;

          self.shadowRoot.querySelector('#pause').disabled = false;
          self.shadowRoot.querySelector('#resume').disabled = false;
        },
      );
      self.onRegistrationFailed = Bridgefy.addListener(
        'onRegistrationFailed',
        data => {
          console.log('onRegistrationFailed', data);
          self.log('onRegistrationFailed', data);

          self.shadowRoot.querySelector('#start').disabled = true;
          self.shadowRoot.querySelector('#stop').disabled = true;

          self.shadowRoot.querySelector('#pause').disabled = true;
          self.shadowRoot.querySelector('#resume').disabled = true;
        },
      );

      self.onStarted = Bridgefy.addListener('onStarted', data => {
        console.log('onStarted', data);
        self.log('onStarted', data);

        self.shadowRoot.querySelector('#start').disabled = true;
        self.shadowRoot.querySelector('#stop').disabled = false;
      });
      self.onStartError = Bridgefy.addListener('onStartError', data => {
        console.log('onStartError', data);
        self.log('onStartError', data);

        self.shadowRoot.querySelector('#start').disabled = false;
        self.shadowRoot.querySelector('#stop').disabled = true;
      });
      self.onStopped = Bridgefy.addListener('onStopped', data => {
        console.log('onStopped', data);
        self.log('onStopped', data);

        self.shadowRoot.querySelector('#start').disabled = false;
        self.shadowRoot.querySelector('#stop').disabled = true;
      });

      self.onDeviceConnected = Bridgefy.addListener(
        'onDeviceConnected',
        data => {
          console.log('onDeviceConnected', data);
          self.log('onDeviceConnected', data);

          const device = data.device;
          const session = data.session;

          self.addDevice(device.address, `${device.userId}`);
        },
      );
      self.onDeviceLost = Bridgefy.addListener('onDeviceLost', data => {
        console.log('onDeviceLost', data);
        self.log('onDeviceLost', data);

        const device = data.device;

        self.removeDevice(device.address);
      });

      self.onDeviceDetected = Bridgefy.addListener('onDeviceDetected', data => {
        console.log('onDeviceDetected', data);
        self.log('onDeviceDetected', data);

        const device = data.device;
      });
      self.onDeviceUnavailable = Bridgefy.addListener(
        'onDeviceUnavailable',
        data => {
          console.log('onDeviceUnavailable', data);
          self.log('onDeviceUnavailable', data);

          const device = data.device;
        },
      );

      self.onMessageReceived = Bridgefy.addListener(
        'onMessageReceived',
        data => {
          console.log('onMessageReceived', data);
          self.log('onMessageReceived', data);

          const message = data.message;
        },
      );
      self.onMessageSent = Bridgefy.addListener('onMessageSent', data => {
        console.log('onMessageSent', data);
        self.log('onMessageSent', data);

        const messageId = data.messageId;
      });

      self.onBroadcastMessageReceived = Bridgefy.addListener(
        'onBroadcastMessageReceived',
        data => {
          console.log('onBroadcastMessageReceived', data);
          self.log('onBroadcastMessageReceived', data);

          const message = data.message;
        },
      );
    }
  },
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  },
);
