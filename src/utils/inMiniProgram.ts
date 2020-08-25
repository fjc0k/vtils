/// <reference types="miniprogram-api-typings" />
import { castArray } from 'lodash-es'

declare const wx: WechatMiniprogram.Wx | undefined
declare const qq: WechatMiniprogram.Wx | undefined
declare const my: WechatMiniprogram.Wx | undefined
declare const jd: WechatMiniprogram.Wx | undefined
declare const swan: WechatMiniprogram.Wx | undefined
declare const tt: WechatMiniprogram.Wx | undefined
declare const dd: WechatMiniprogram.Wx | undefined

const brands = [
  '微信',
  'QQ',
  '支付宝',
  '京东',
  '百度',
  '字节跳动',
  '钉钉',
] as const

export type MiniProgramBrand = typeof brands[number]

export type MiniProgramApi = WechatMiniprogram.Wx & {
  /** 小程序品牌 */
  readonly $brand: MiniProgramBrand
}

const factories: Record<
  MiniProgramBrand,
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
 * 检查是否在指定品牌的小程序中，若在，返回承载其 API 的全局对象，若不在，返回 false。
 *
 * @param brand 指定的小程序品牌，若未指定，则表示所有小程序品牌
 * @returns 返回检查结果
 */
export function inMiniProgram(
  brand?: MiniProgramBrand | MiniProgramBrand[],
): MiniProgramApi | false {
  for (const currentBrand of brand ? castArray(brand) : brands) {
    if (factories[currentBrand]) {
      const mp = factories[currentBrand]()
      if (mp && typeof mp.getSystemInfoSync === 'function') {
        // @ts-ignore
        ;((mp as any) as MiniProgramApi).$brand = currentBrand
        return mp as any
      }
    }
  }
  return false
}
