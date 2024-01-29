import { parseUrlQueryString } from '../utils/index.ts'
import { getCurrentPageQuery } from './getCurrentPageQuery.ts'

export type GetSceneParamsParser<T> =
  | 'searchParams'
  | 'json'
  | ((data: string) => T)

/**
 * 获取场景参数。
 *
 * @param parser 解析器
 */
export function getSceneParams<T extends Record<any, any> = Record<any, any>>(
  parser: GetSceneParamsParser<T> = 'searchParams',
): T {
  const { scene } = getCurrentPageQuery<{ scene?: string }>()
  if (!scene) {
    return {} as any
  }
  if (parser === 'searchParams') {
    return parseUrlQueryString<T>(scene)
  }
  if (parser === 'json') {
    return JSON.parse(scene)
  }
  return parser(scene)
}
