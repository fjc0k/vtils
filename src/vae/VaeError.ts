import { VaeIssue } from './VaeIssue'

export interface VaeErrorIssue {
  path: Array<string | number>
  message: string
}

export class VaeError extends Error {
  name = 'VaeError'

  constructor(public issues: VaeIssue[]) {
    super(VaeError.messageFromIssues(issues))
  }

  /**
   * 从问题里导出信息
   */
  static messageFromIssues(issues: VaeIssue[]) {
    return issues.map(issue => issue.message).join('; ')
  }
}
