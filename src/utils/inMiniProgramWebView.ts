/**
 * 检查是否在小程序 WebView 中。
 *
 * 仅支持微信、QQ、支付宝、抖音、百度。
 */
export function inMiniProgramWebView(): boolean {
  const ua = navigator.userAgent.toLowerCase()

  const res =
    // 微信 https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html#%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3-4
    (window as any).__wxjs_environment === 'miniprogram' ||
    // QQ https://q.qq.com/wiki/develop/miniprogram/component/open-ability/web-view.html#%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3-4
    (window as any).__qqjs_environment === 'miniprogram' ||
    // 微信 https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html#%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3-5
    // QQ https://q.qq.com/wiki/develop/miniprogram/component/open-ability/web-view.html#%E7%9B%B8%E5%85%B3%E6%8E%A5%E5%8F%A3-5
    // 支付宝 https://opendocs.alipay.com/mini/component/web-view#%E5%B1%9E%E6%80%A7%E8%AF%B4%E6%98%8E
    !!~ua.indexOf('miniprogram') ||
    // 抖音 https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/open-capacity/web-view#%E7%8E%AF%E5%A2%83%E5%88%A4%E6%96%AD%E7%A4%BA%E4%BE%8B
    !!~ua.indexOf('toutiaomicroapp') ||
    // 百度
    !!~ua.indexOf('swan')

  return res
}
