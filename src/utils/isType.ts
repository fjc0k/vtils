/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * 对 `value is T` 的封装。
 */
export function isType<T>(value: any): value is T {
  return true
}
