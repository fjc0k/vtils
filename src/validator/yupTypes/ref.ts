export interface Ref {
  readonly __isYupRef: true
}

export interface RefOptions {
  contextPrefix?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export declare function ref<T>(path: string, options?: RefOptions): Ref
