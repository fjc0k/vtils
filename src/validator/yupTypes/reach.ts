import { MixedSchema } from './mixed.ts'
import { ObjectSchema } from './object.ts'

export declare function reach<T extends {}>(
  schema: ObjectSchema<T>,
  path: string,
  value?: T,
  context?: {},
): MixedSchema
