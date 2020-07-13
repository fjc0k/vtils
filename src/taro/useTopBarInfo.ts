import { getTopBarInfo, GetTopBarInfoResult } from './getTopBarInfo'
import { useMemo } from 'react'

export function useTopBarInfo(): GetTopBarInfoResult {
  return useMemo(getTopBarInfo, [])
}
