import { VaeBaseSchemaPath } from './VaeBaseSchema'
import { VaeIssue } from './VaeIssue'

export class VaeContext {
  path: VaeBaseSchemaPath = []

  issues: VaeIssue[] = []

  withPath(path: VaeBaseSchemaPath, cb: () => any) {
    const oldPath = this.getPathSnapshot()
    this.path = path
    cb()
    this.path = oldPath
  }

  getPathSnapshot() {
    return this.path.slice()
  }

  addIssue(issue: VaeIssue) {
    this.issues.push(issue)
  }
}
