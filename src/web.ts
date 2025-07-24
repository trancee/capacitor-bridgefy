import { WebPlugin } from '@capacitor/core';

import type { BridgefyPlugin } from './definitions';

export class BridgefyWeb extends WebPlugin implements BridgefyPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
