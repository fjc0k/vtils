const re = /^c[0-9a-z]+$/

/**
 * 检测传入值是否是 Cuid。
 *
 * @param value 要检测的值
 * @returns 返回检测结果
 * @example
 * ```typescript
 * isCuid('1') // => false
 * isCuid('cjld2cjxh0000qzrmn831i7rn') // => true
 * ```
 * @see https://github.com/paralleldrive/cuid
 */
export function isCuid(value: string): boolean {
  return (
    !!value &&
    typeof value === 'string' &&
    // 注意: Cuid长度并不保证是固定的25位
    // https://github.com/paralleldrive/cuid/issues/51
    value.length >= 20 &&
    value.length <= 30 &&
    value[0] === 'c' &&
    re.test(value)
  )
}
