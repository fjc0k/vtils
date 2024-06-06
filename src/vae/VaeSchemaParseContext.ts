import { VaeIssue } from './VaeIssue'

export class VaeSchemaParseContext {
  /**
   * 问题列表
   */
  issues: VaeIssue[] = []

  /**
   * 新增问题
   */
  addIssue(issue: VaeIssue) {
    this.issues.push(issue)
  }
}
