/**
 * 检查是否在 [Taro 3](https://taro.js.org/) 中。
 *
 * @returns 返回检查结果
 */
export function inTaro(): boolean {
  // ref: https://github.com/NervJS/taro/blob/next/packages/taro-runtime/src/bom/navigator.ts#L16
  return typeof navigator !== 'undefined' && navigator.product === 'Taro'
}
