import { VaeIssue } from './VaeIssue'

export interface VaeErrorIssue {
  path: Array<string | number>
  message: string
}

export class VaeError extends Error {
  name = 'VaeError'

  constructor(public issues: VaeIssue[]) {
    super()
  }
}
