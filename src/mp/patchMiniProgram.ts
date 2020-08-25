import { ensureInMiniProgram } from './ensureInMiniProgram'

/**
 * 给各个品牌小程序打补丁以期行为与微信保持一致。
 */
export function patchMiniProgram() {
  ensureInMiniProgram(mp => {
    if (mp.$brand === '支付宝') {
      // 支持通过 options 获取页面参数
      const originalPage = Page
      Page = function (options) {
        const onLoad = options.onLoad
        options.onLoad = function (query) {
          ;(this as any).options = query
          onLoad && onLoad.call(this, query)
        }
        originalPage(options)
      }
    }
  })
}
