import { getTopBarInfo, GetTopBarInfoResult } from './getTopBarInfo'
import { useMemo } from 'react'

/**
 * 获取顶栏信息。
 *
 * @returns 返回获取到的顶栏信息
 */
export function useTopBarInfo(): GetTopBarInfoResult {
  return useMemo(getTopBarInfo, [])
}
