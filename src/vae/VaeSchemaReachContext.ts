import { VaeSchema } from './VaeSchema'

export class VaeSchemaReachContext {
  /**
   * 模式列表
   */
  schemas: Array<{
    path: string
    schema: VaeSchema
  }> = []

  /**
   * 新增模式
   */
  addSchema(path: string, schema: VaeSchema) {
    this.schemas.push({ path, schema })
  }
}
