import { inMiniProgram } from '../utils'

let $mp: ReturnType<typeof inMiniProgram> | undefined

/**
 * 确保当前在小程序环境并执行回调。
 *
 * @param cb 要执行的回调，第一个参数为小程序 API 挂载的全局变量
 * @returns 返回回调的执行结果
 */
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
