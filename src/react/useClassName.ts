import { DependencyList, useMemo } from 'react'

/**
 * 获取类名字符串。
 *
 * @public
 * @param getClassValues 获取类名列表函数
 * @param deps 当依赖变更时重新获取
 * @returns 返回类名字符串
 * @example
 * ```typescript
 * const [mini, setMini] = useState(true)
 * const buttonClassName = useClassName(() => [
 *   'ui-btn',
 *   mini && 'ui-btn_mini',
 * ], [mini])
 * console.log(buttonClassName) // => 'ui-btn ui-btn_mini'
 * setMini(false)
 * console.log(buttonClassName) // => 'ui-btn'
 * ```
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
