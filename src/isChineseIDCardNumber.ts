const isValidDate = (year: number, month: number, day: number): boolean => {
  const date = new Date(year, month - 1, day)
  return (
    date.getFullYear() === year
      && date.getMonth() + 1 === month
      && date.getDate() === day
  )
}

/**
 * 检测 `value` 是否是中国大陆身份证号码。
 *
 * @param value 要检测的值
 * @returns 是（true）或否（false）
 * @see https://my.oschina.net/labrusca/blog/306116
 */
export default function isChineseIDCardNumber(value: string): boolean {
  const len = value.length

  // 长度错误
  if (len !== 15 && len !== 18) {
    return false
  }

  // 15 位
  if (len === 15) {
    return isValidDate(+`19${value.substr(6, 2)}`, +value.substr(8, 2), +value.substr(10, 2))
  }

  // 18 位
  if (!isValidDate(+value.substr(6, 4), +value.substr(10, 2), +value.substr(12, 2))) {
    return false
  }

  // 校验码
  const weightMap = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  return codeMap[
    value.split('').slice(0, 17).reduce((s, num, index) => {
      return s += +num * weightMap[index]
    }, 0) % 11
  ] === value[17].toUpperCase()
}
