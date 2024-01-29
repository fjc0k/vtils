import { VaeSchema } from './VaeSchema.ts'

export class VaeSchemaReachContext {
  schemas: Array<{
    path: string
    schema: VaeSchema
  }> = []

  addSchema(path: string, schema: VaeSchema) {
    this.schemas.push({ path, schema })
  }
}
