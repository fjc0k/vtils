const testRegExp = /^(11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82)[0-9]{15}[0-9Xx]$/
const weightMap = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
const codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

const isValidDate = (year: number, month: number, day: number): boolean => {
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day &&
    date.getTime() < new Date().getTime() &&
    year > 1900
  )
}

/**
 * 检测传入的值是否是合法的中国大陆居民 `18` 位身份证号码。
 *
 * ```
 * isChineseIDCardNumber('123456') // => false
 * ```
 *
 * @public
 * @param value 要检测的值
 * @returns 返回检测结果
 */
export function isChineseIDCardNumber(value: string): boolean {
  const len = value.length

  // 长度错误
  if (len !== 18) {
    return false
  }

  // 模式校验
  if (!testRegExp.test(value)) {
    return false
  }

  // 出生日期
  if (
    !isValidDate(
      +value.substr(6, 4),
      +value.substr(10, 2),
      +value.substr(12, 2),
    )
  ) {
    return false
  }

  // 校验码
  const sum = value
    .split('')
    .slice(0, 17)
    .reduce((s, num, index) => {
      s += +num * weightMap[index]
      return s
    }, 0)
  const code = codeMap[sum % 11]
  return code === value[17].toUpperCase()
}
