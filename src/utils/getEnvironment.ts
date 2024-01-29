import { inAndroid } from './inAndroid.ts'
import { inBrowser } from './inBrowser.ts'
import { inDeno } from './inDeno.ts'
import { inIOS } from './inIOS.ts'
import { inMiniProgram } from './inMiniProgram.ts'
import { inNodeJS } from './inNodeJS.ts'
import { inTaro } from './inTaro.ts'
import { inWechatWebView } from './inWechatWebView.ts'

export interface GetEnvironmentResult {
  /** 浏览器 */
  readonly browser: boolean
  /** 微信 WebView */
  readonly wechatWebView: boolean
  /** 小程序 */
  readonly miniProgram: boolean
  /** 微信小程序 */
  readonly wechatMiniProgram: boolean
  /** iOS */
  readonly ios: boolean
  /** 安卓 */
  readonly android: boolean
  /** Node.js */
  readonly nodejs: boolean
  /** Deno */
  readonly deno: boolean
  /** Taro 3 */
  readonly taro: boolean
}

let env: GetEnvironmentResult | undefined

/**
 * 获取运行环境信息。
 *
 * @returns 返回运行环境信息
 */
export function getEnvironment(): GetEnvironmentResult {
  if (env == null) {
    env = {
      browser: inBrowser(),
      wechatWebView: inWechatWebView(),
      miniProgram: !!inMiniProgram(),
      wechatMiniProgram: !!inMiniProgram('微信'),
      ios: inIOS(),
      android: inAndroid(),
      nodejs: inNodeJS(),
      deno: inDeno(),
      taro: inTaro(),
    }
  }
  return env
}
