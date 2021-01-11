import { nanoid as _nanoid } from 'nanoid'

/**
 * 生成一个 [nanoid](https://github.com/ai/nanoid/)。
 *
 * @param size 生成的 ID 长度，默认 21
 * @example
 * ```typescript
 * nanoid() // => "Uakgb_J5m9g-0JDMbcJqL"
 * ```
 */
export function nanoid(size?: number): string {
  return _nanoid(size)
}
