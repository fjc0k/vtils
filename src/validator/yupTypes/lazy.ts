declare module 'yup/es' {
  export interface Lazy extends MixedSchema {}

  export function lazy<X extends MixedSchema>(fn: (value: any) => X): Lazy
}
