import { DependencyList, useMemo } from 'react'

export function useClassName(
  getClassValues: () => any[] | undefined,
  deps: DependencyList,
): string | undefined {
  const className = useMemo(() => {
    const classValues = getClassValues()
    if (classValues) {
      const validClassValues = classValues.filter(
        value => typeof value === 'string' && value !== '',
      )
      return validClassValues.length ? validClassValues.join(' ') : undefined
    }
    return undefined
  }, deps)
  return className
}
