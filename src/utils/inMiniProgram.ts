/// <reference types="miniprogram-api-typings" />
import { castArray } from 'lodash-es'

declare const wx: WechatMiniprogram.Wx | undefined
declare const qq: WechatMiniprogram.Wx | undefined
declare const my: WechatMiniprogram.Wx | undefined
declare const jd: WechatMiniprogram.Wx | undefined
declare const swan: WechatMiniprogram.Wx | undefined
declare const tt: WechatMiniprogram.Wx | undefined
declare const dd: WechatMiniprogram.Wx | undefined

const platforms = [
  '微信',
  'QQ',
  '支付宝',
  '京东',
  '百度',
  '字节跳动',
  '钉钉',
] as const

export type InMiniProgramPlatform = typeof platforms[number]

const factories: Record<
  InMiniProgramPlatform,
  () => false | WechatMiniprogram.Wx
> = {
  微信: () => typeof wx !== 'undefined' && wx,
  QQ: () => typeof qq !== 'undefined' && qq,
  支付宝: () => typeof my !== 'undefined' && my,
  京东: () => typeof jd !== 'undefined' && jd,
  百度: () => typeof swan !== 'undefined' && swan,
  字节跳动: () => typeof tt !== 'undefined' && tt,
  钉钉: () => typeof dd !== 'undefined' && dd,
}

/**
 * 检查是否在指定的小程序平台中，若在，返回承载其 API 的全局对象，若不在，返回 false。
 *
 * @param platform 指定的小程序平台，若未指定，则表示所有小程序平台
 * @returns 返回检查结果
 */
export function inMiniProgram(
  platform?: InMiniProgramPlatform | InMiniProgramPlatform[],
): WechatMiniprogram.Wx | false {
  for (const currentPlatform of platform ? castArray(platform) : platforms) {
    if (factories[currentPlatform]) {
      const mp = factories[currentPlatform]()
      if (mp && typeof mp.getSystemInfoSync === 'function') {
        return mp
      }
    }
  }
  return false
}
