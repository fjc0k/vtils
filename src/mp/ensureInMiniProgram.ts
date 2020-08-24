import { inMiniProgram } from '../utils'

let $mp: ReturnType<typeof inMiniProgram> | undefined

export function ensureInMiniProgram<T>(
  cb: (mp: Exclude<typeof $mp, false | undefined>) => T,
): T {
  if ($mp === undefined) {
    $mp = inMiniProgram()
  }
  if ($mp) {
    return cb($mp)
  }
  throw new Error('不在小程序环境中')
}
