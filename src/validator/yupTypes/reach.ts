declare module 'yup/es' {
  export function reach<T>(
    schema: ObjectSchema<T>,
    path: string,
    value?: T,
    context?: {},
  ): MixedSchema
}
