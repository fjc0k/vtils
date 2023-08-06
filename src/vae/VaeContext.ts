import { VaeIssue } from './VaeIssue'
import { VaeSchemaPath } from './VaeSchema'

export class VaeContext {
  path: VaeSchemaPath = []

  issues: VaeIssue[] = []

  withPath(path: VaeSchemaPath, cb: () => any) {
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
