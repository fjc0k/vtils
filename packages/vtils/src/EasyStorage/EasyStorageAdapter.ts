export abstract class EasyStorageAdapter {
  abstract set(k: string, v: any): Promise<void>

  abstract setSync(k: string, v: any): void

  abstract get(k: string): Promise<any>

  abstract getSync(k: string): any

  abstract remove(k: string): Promise<void>

  abstract removeSync(k: string): void

  abstract clear(): Promise<void>

  abstract clearSync(): void
}
