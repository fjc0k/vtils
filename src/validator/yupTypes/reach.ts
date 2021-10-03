import { MixedSchema } from './mixed'
import { ObjectSchema } from './object'

export declare function reach<T>(
  schema: ObjectSchema<T>,
  path: string,
  value?: T,
  context?: {},
): MixedSchema
