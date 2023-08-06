import { VaeIssue } from './VaeIssue'
import { VaeSchemaPath } from './VaeSchema'

export class VaeContext {
  oldPath: VaeSchemaPath = []

  path: VaeSchemaPath = []

  issues: VaeIssue[] = []

  setPath = (path: VaeSchemaPath) => {
    this.oldPath = this.path.slice()
    this.path = path
  }

  restorePath = () => {
    this.path = this.oldPath
  }

  addIssue(issue: VaeIssue) {
    this.issues.push(issue)
  }
}
