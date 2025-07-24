import { registerPlugin } from '@capacitor/core';

import type { BridgefyPlugin } from './definitions';

const Bridgefy = registerPlugin<BridgefyPlugin>('Bridgefy', {
  web: () => import('./web').then((m) => new m.BridgefyWeb()),
});

export * from './definitions';
export { Bridgefy };
