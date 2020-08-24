import { inMiniProgram } from '../utils'

let $mp: ReturnType<typeof inMiniProgram> | undefined

export function ensureInMiniProgram<T>(
  cb: (mp: Exclude<typeof $mp, false | undefined>) => Promise<T>,
): Promise<T> {
  if ($mp === undefined) {
    $mp = inMiniProgram()
  }
  if ($mp) {
    return cb($mp)
  }
  return Promise.reject('不在小程序环境中')
}
