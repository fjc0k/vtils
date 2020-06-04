import { useCallback, useState } from 'react'

/**
 * @public
 */
export type UseToggleResult = [
  boolean,
  {
    (): void
    set(value: boolean): void
    true(): void
    false(): void
  },
]

/**
 * 布尔值切换器。
 *
 * @public
 * @param initialValue - 初始值
 * @example
 * ```typescript
 * useToggle(false)
 * ```
 */
export function useToggle(initialValue: boolean): UseToggleResult {
  const [value, setValue] = useState(initialValue)
  const toggle = (useCallback(() => {
    setValue(value => !value)
  }, []) as any) as UseToggleResult[1]
  toggle.set = useCallback(value => {
    setValue(value)
  }, [])
  toggle.true = useCallback(() => {
    setValue(true)
  }, [])
  toggle.false = useCallback(() => {
    setValue(false)
  }, [])
  return [value, toggle]
}
