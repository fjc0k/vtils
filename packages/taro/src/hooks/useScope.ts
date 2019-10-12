import {Component, useDidShow, useState} from '@tarojs/taro'

/**
 * 获取小程序原生作用域。同类组件中的 `this.$scope`。
 *
 * @example
 * ```ts
 * const scope = useScope()
 * useEffect(() => {
 *   if (scope) {
 *     const ctx = Taro.createCanvasContext('canvas', scope)
 *     // ...
 *   }
 * }, [scope])
 * ```
 */
export function useScope(): Component['$scope'] {
  const [scope, setScope] = useState<Component['$scope']>()
  useDidShow(function (this: Component) {
    setScope(this.$scope)
  })
  return scope
}
