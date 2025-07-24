export interface BridgefyPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
