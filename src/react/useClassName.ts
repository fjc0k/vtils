import { DependencyList, useMemo } from 'react'

/**
 * 获取类名字符串。
 *
 * @public
 * @param getClassValues - 获取类名列表函数
 * @param deps - 依赖
 * @returns 返回类名字符串
 */
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
