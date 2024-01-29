import { useMemo } from 'react'
import { getEnvironment, GetEnvironmentResult } from '../utils/index.ts'

/**
 * 获取运行环境信息。
 *
 * @returns 返回运行环境信息
 */
export function useEnvironment(): GetEnvironmentResult {
  return useMemo(getEnvironment, [])
}
