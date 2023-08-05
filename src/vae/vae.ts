import { VaeNumberSchema } from './VaeNumberSchema'
import { VaeObjectSchema } from './VaeObjectSchema'
import { VaeStringSchema } from './VaeStringSchema'

export function string() {
  return new VaeStringSchema()
}

export function number() {
  return new VaeNumberSchema()
}

export function object() {
  return new VaeObjectSchema()
}
