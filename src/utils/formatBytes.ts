const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

/**
 * 格式化字节数，以 1024 作为千字节数。
 *
 * @param value 要格式化的字节数
 * @returns 返回结果
 */
export function formatBytes(value: number): string {
  if (value < 1024) {
    return `${Number(value.toFixed(2))} ${units[0]}`
  }
  const exponent = Math.min(
    Math.floor(Math.log(value) / Math.log(1024)),
    units.length - 1,
  )
  value = Number((value / Math.pow(1024, exponent)).toFixed(2))
  return `${value} ${units[exponent]}`
}
