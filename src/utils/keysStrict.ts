import { keys } from 'lodash-es'

/**
 * 同 keys，不过采用了严格的类型定义。
 */
export const keysStrict = (keys as any) as <T extends Record<any, any>>(
  object: T,
) => Array<keyof T>
