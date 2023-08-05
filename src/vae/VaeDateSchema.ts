import { VaeBaseSchema } from './VaeBaseSchema'

export class VaeDateSchema extends VaeBaseSchema<Date> {
  // https://zod.dev/?id=dates
  min() {}
  max() {}
}
