import { RequiredDeep } from '../types'

/**
 * 将给定的值 `RequiredDeep` 化。
 *
 * @param value 值
 */
export function asRequiredDeep<T>(value: T): RequiredDeep<T> {
  return value as any
}
