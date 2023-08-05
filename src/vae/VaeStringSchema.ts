import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeStringSchema extends VaeBaseSchema<string> {
  min(minLength: number, message: VaeLocaleMessage = VaeLocale.string.min) {
    return this.check({
      fn: v => v.length >= minLength,
      message: message,
    })
  }

  // https://zod.dev/?id=strings
  max() {}
  length() {}
  email() {}
  url() {}
  emoji() {}
  uuid() {}
  cuid() {}
  cuid2() {}
  regex() {}
  includes() {}
  startsWith() {}
  endsWith() {}
  datetime() {}
  ip() {}
  trim() {}
  toLowerCase() {}
  toUpperCase() {}
}
