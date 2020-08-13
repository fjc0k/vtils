import React, { useCallback } from 'react'
import { submit } from './submit'
import { SubmitActionPayload } from '../utils'

export function useSubmit<TResult>(
  action: (payload: SubmitActionPayload) => Promise<TResult>,
  deps: React.DependencyList,
): () => Promise<TResult> {
  return useCallback(() => submit(action), deps)
}
