import { useCallback, useState } from 'react'

export type UseToggleResult = [
  boolean,
  {
    (): void
    set(value: boolean): void
    true(): void
    false(): void
  },
]

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
