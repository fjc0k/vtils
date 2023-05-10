import { MixedSchema } from './mixed'
import { ObjectSchema } from './object'

export declare function reach<T extends {}>(
  schema: ObjectSchema<T>,
  path: string,
  value?: T,
  context?: {},
): MixedSchema
