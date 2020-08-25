import { getTopBarInfo, GetTopBarInfoResult } from '../mp'
import { useMemo } from 'react'

export function useTopBarInfo(): GetTopBarInfoResult {
  return useMemo(getTopBarInfo, [])
}
