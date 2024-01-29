import { VaeIssue } from './VaeIssue.ts'

export class VaeSchemaParseContext {
  issues: VaeIssue[] = []

  addIssue(issue: VaeIssue) {
    this.issues.push(issue)
  }
}
