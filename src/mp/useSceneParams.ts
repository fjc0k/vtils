import { getSceneParams, GetSceneParamsParser } from './getSceneParams'
import { useMemo } from 'react'

/**
 * 获取场景参数。
 *
 * @param parser 解析器
 */
export function useSceneParams<T extends Record<any, any> = Record<any, any>>(
  parser: GetSceneParamsParser<T> = 'searchParams',
): T {
  return useMemo(() => getSceneParams<T>(parser), [])
}
