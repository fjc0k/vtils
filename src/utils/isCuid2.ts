const re = /^[0-9a-z]+$/

export interface IsCuid2Options {
  /**
   * @default 24
   */
  minLength?: number
  /**
   * @default 24
   */
  maxLength?: number
}

/**
 * 检测传入值是否是 Cuid2。
 *
 * @param value 要检测的值
 * @returns 返回检测结果
 * @example
 * ```typescript
 * isCuid2('1') // => false
 * isCuid2('tz4a98xxat96iws9zmbrgj3a') // => true
 * ```
 * @see https://github.com/paralleldrive/cuid2
 */
export function isCuid2(value: string, options: IsCuid2Options = {}): boolean {
  const { minLength = 24, maxLength = 24 } = options
  return (
    !!value &&
    typeof value === 'string' &&
    value.length >= minLength &&
    value.length <= maxLength &&
    re.test(value)
  )
}
