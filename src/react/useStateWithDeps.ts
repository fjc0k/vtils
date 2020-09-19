import React, { useState } from 'react'
import { useUpdateEffect } from 'react-use'

/**
 * 给 useState 插上依赖的翅膀。依赖变化时会更新状态。
 *
 * @param state 状态
 * @param deps 依赖
 * @returns 返回结果同 useState
 */
export function useStateWithDeps<S>(
  state: S | (() => S),
  deps: React.DependencyList,
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [value, setValue] = useState(state)
  useUpdateEffect(() => {
    setValue(state)
  }, deps)
  return [value, setValue]
}
