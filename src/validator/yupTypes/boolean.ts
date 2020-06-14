declare module 'yup/es' {
  export interface BooleanSchema<T extends boolean = boolean>
    extends MixedSchema<T> {}

  export function boolean<T extends boolean = boolean>(): BooleanSchema<T>
}
