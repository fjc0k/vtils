import { MixedSchema } from './mixed'

export interface Lazy extends MixedSchema {}

export declare function lazy<X extends MixedSchema>(fn: (value: any) => X): Lazy
