import { VaeSchemaPath } from './VaeSchema'

export type VaeIssue = {
  /**
   * issue 产生的路径
   */
  path: VaeSchemaPath
  /**
   * issue 信息
   */
  message: string
}
