declare module 'yup/es' {
  export interface Ref {
    readonly __isYupRef: true
  }

  export interface RefOptions {
    contextPrefix?: string
  }

  export function ref<T>(path: string, options?: RefOptions): Ref
}
