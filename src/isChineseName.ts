import { isHan } from './isHan'

/**
 * 检测 `value` 是否是中国人姓名，支持少数名族姓名中间的 `·` 号。
 *
 * @param value 要检测的值
 * @returns `value` 是中国人姓名返回 `true`，否则返回 `false`
 */
export function isChineseName(value: string): boolean {
  return (
    value
      && value.length > 1
      && value.length < 20
      && value[0] !== '\u00B7'
      && value.indexOf('\u00B7\u00B7') === -1
      && isHan(value.replace(/\u00B7/g, ''))
  )
}
