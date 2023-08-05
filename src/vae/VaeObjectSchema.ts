import { VaeBaseSchema } from './VaeBaseSchema'

export class VaeObjectSchema extends VaeBaseSchema<{}> {
  constructor(schema?: any) {
    super()

    if (schema) {
      this.shape(schema)
    }
  }

  shape(schema: any) {
    Object.keys(schema).forEach(key => {
      this.check({
        fn: schema[key],
        path: [key],
        message: '',
      })
    })
  }
}
