import { MixedSchema } from './mixed.ts'

export interface Lazy extends MixedSchema {}

export declare function lazy<X extends MixedSchema>(fn: (value: any) => X): Lazy
