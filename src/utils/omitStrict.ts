import { omit } from 'lodash-uni'
import { OmitStrict, OneOrMore } from '../types/index.ts'

/**
 * 同 {@link https://lodash.com/docs/4.17.15#omit | omit}，不过采用了严格的类型定义。
 *
 * @public
 */
export const omitStrict = omit as any as <
  T extends Record<any, any>,
  K extends keyof T,
>(
  object: T,
  ...paths: Array<OneOrMore<K>>
) => OmitStrict<T, K>
