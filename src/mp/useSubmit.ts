import React, { useCallback } from 'react'
import { SubmitActionPayload } from '../utils/index.ts'
import { submit } from './submit.ts'

/**
 * 对提交类行为的封装。
 */
export function useSubmit<TResult>(
  action: (payload: SubmitActionPayload) => Promise<TResult>,
  deps: React.DependencyList,
): () => Promise<TResult> {
  return useCallback(() => submit(action), deps)
}
