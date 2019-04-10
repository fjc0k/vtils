import { reduce } from './reduce'
import { repeat } from './repeat'

export type FormatTemplatePatternToValue = Record<string | number, string | number>

/**
 * 根据 `patternToValue` 格式化模板字符串。
 *
 * @param template 模板字符串
 * @param patternToValue 单字符 --> 值
 * @returns 格式化后的字符串
 */
export function formatTemplate(template: string, patternToValue: FormatTemplatePatternToValue): string {
  return reduce(
    patternToValue,
    (result, value, pattern) => {
      const strValue = String(value)
      const strLen = strValue.length
      return result.replace(
        new RegExp(`(${pattern}+)`, 'g'),
        $0 => {
          const n = $0.length
          return (
            n === 1 || n === strLen ? strValue // n=1或n=len: 直接返回
              : n < strLen ? strValue.substr(strLen - n) // n<len: 截取后n位
                : repeat(0, n - strLen) + strValue // n>len: 前填充0到n位
          )
        },
      )
    },
    template,
  )
}
