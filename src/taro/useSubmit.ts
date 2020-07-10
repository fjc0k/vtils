import React, { useCallback } from 'react'
import { submit, SubmitActionPayload } from './submit'

export function useSubmit<TResult>(
  action: (payload: SubmitActionPayload) => Promise<TResult>,
  deps: React.DependencyList,
): () => Promise<TResult> {
  return useCallback(() => submit(action), deps)
}
