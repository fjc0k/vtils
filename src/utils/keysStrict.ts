import { keys } from 'lodash-uni'

/**
 * 同 {@link https://lodash.com/docs/4.17.15#keys | keys}，不过采用了严格的类型定义。
 *
 * @public
 */
export const keysStrict = (keys as any) as <T extends Record<any, any>>(
  object: T,
) => Array<keyof T>
