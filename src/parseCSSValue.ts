export interface CSSValue {
  /** CSS 数值 */
  value: number,
  /** CSS 单位 */
  unit: string,
}

/**
 * 解析 `CSS` 值的数值和单位。
 *
 * @param value 要解析的值
 * @param defaultUnit 默认单位
 * @returns 返回解析结果
 * @example
 * ```ts
 * parseCSSValue('12px') // => { value: 12, unit: 'px' }
 * parseCSSValue(12) // => { value: 12, unit: 'px' }
 * parseCSSValue('12%') // => { value: 12, unit: '%' }
 * ```
 */
export function parseCSSValue(
  value: string | number,
  defaultUnit: string = 'px',
): CSSValue {
  if (typeof value === 'number') {
    return {
      value,
      unit: defaultUnit,
    }
  }
  const matches = value.trim().match(/^(-?[\d.]+)([a-z]+|%)$/i)
  return matches !== null
    ? {
      value: Number(matches[1]),
      unit: matches[2],
    }
    : {
      value: Number(value),
      unit: defaultUnit,
    }
}
