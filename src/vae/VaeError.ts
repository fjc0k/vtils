export interface VaeErrorIssue {
  path: Array<string | number>
  message: string
}

export class VaeError extends Error {}
