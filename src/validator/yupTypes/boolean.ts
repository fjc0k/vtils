import { MixedSchema } from './mixed'

export interface BooleanSchema<T extends boolean = boolean>
  extends MixedSchema<T> {}

export declare function boolean<T extends boolean = boolean>(
  payload?: (schema: BooleanSchema<T>) => BooleanSchema<T>,
): BooleanSchema<T>
