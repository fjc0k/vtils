// @ts-nocheck
// Copyright 2019 "David Mark Clements <david.mark.clements@gmail.com>"
// MIT Licensed
// https://github.com/davidmarkclements/rfdc
// Modified by Jay Fong
/**
 * 深克隆快速版。
 *
 * @param value 要克隆的值
 * @param ignore 忽略的值
 * @returns 返回克隆后的值
 * @example
 * ```typescript
 * cloneDeepFast({ x: [1] })
 * // => { x: [1] }
 * ```
 */
export function cloneDeepFast<T>(
  value: T,
  ignore?: (value: unknown) => boolean | undefined,
): T {
  if (typeof value !== 'object' || value === null) return value
  if (value instanceof Date) return new Date(value)
  if (Array.isArray(value)) return cloneArray(value, ignore)
  const o2 = {}
  for (const k in value) {
    if (Object.hasOwnProperty.call(value, k) === false) continue
    const cur = value[k]
    if (typeof cur !== 'object' || cur === null || (ignore && ignore(cur))) {
      o2[k] = cur
    } else if (cur instanceof Date) {
      o2[k] = new Date(cur)
    } else {
      o2[k] = cloneDeepFast(cur, ignore)
    }
  }
  return o2
}

function cloneArray(a, ignore) {
  const keys = Object.keys(a)
  const a2 = new Array(keys.length)
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]
    const cur = a[k]
    if (typeof cur !== 'object' || cur === null || (ignore && ignore(cur))) {
      a2[k] = cur
    } else if (cur instanceof Date) {
      a2[k] = new Date(cur)
    } else {
      a2[k] = cloneDeepFast(cur, ignore)
    }
  }
  return a2
}
