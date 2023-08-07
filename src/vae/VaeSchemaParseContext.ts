import { VaeIssue } from './VaeIssue'

export class VaeSchemaParseContext {
  issues: VaeIssue[] = []

  addIssue(issue: VaeIssue) {
    this.issues.push(issue)
  }
}
