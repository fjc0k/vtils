import { init } from '@paralleldrive/cuid2'
import { memoize } from '../utils'

const createIdFactory = memoize(
  (length: number) => init({ length }),
  length => length,
)

/**
 * 生成 Cuid2。
 *
 * @param length 长度，默认: 24
 * @see https://github.com/paralleldrive/cuid2
 */
export function cuid2(length?: number): string {
  return createIdFactory(length || 24)()
}
