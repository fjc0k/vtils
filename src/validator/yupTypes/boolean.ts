import { MixedSchema } from './mixed'

export interface BooleanSchema<T extends boolean = boolean>
  extends MixedSchema<T> {}

export declare function boolean<T extends boolean = boolean>(): BooleanSchema<T>
