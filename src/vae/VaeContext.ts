import { VaeIssue } from './VaeIssue'

export class VaeContext {
  issues: VaeIssue[] = []

  addIssue(issue: VaeIssue) {
    this.issues.push(issue)
  }
}
