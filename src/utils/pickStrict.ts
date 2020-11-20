import { OneOrMore } from '../types'
import { pick } from 'lodash-uni'

/**
 * 同 {@link https://lodash.com/docs/4.17.15#pick | pick}，不过采用了严格的类型定义。
 *
 * @public
 */
export const pickStrict = (pick as any) as <
  T extends Record<any, any>,
  K extends keyof T
>(
  object: T,
  ...paths: Array<OneOrMore<K>>
) => Pick<T, K>
