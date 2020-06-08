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
 * @param initialValue 初始值
 * @returns 返回结果和操作
 * @example
 * ```typescript
 * const [value, toggle] = useToggle(false) // value: false
 * toggle() // value: true
 * toggle.set(false) // value: false
 * toggle.true() // => value: true
 * toggle.false() // => value: false
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
