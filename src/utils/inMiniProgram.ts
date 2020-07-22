import { castArray } from 'lodash-es'

declare const wx: any
declare const qq: any
declare const my: any
declare const jd: any
declare const swan: any
declare const tt: any
declare const dd: any

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

const detectors: Record<InMiniProgramPlatform, () => boolean> = {
  微信: () => typeof wx !== 'undefined' && !!wx.getSystemInfo,
  QQ: () => typeof qq !== 'undefined' && !!qq.getSystemInfo,
  支付宝: () => typeof my !== 'undefined' && !!my.getSystemInfo,
  京东: () => typeof jd !== 'undefined' && !!jd.getSystemInfo,
  百度: () => typeof swan !== 'undefined' && !!swan.getSystemInfo,
  字节跳动: () => typeof tt !== 'undefined' && !!tt.getSystemInfo,
  钉钉: () => typeof dd !== 'undefined' && !!dd.getSystemInfo,
}

/**
 * 检查是否在指定的小程序平台中。
 *
 * @param platform 指定的小程序平台，若未指定，则表示所有小程序平台
 * @returns 返回检查结果
 */
export function inMiniProgram(
  platform?: InMiniProgramPlatform | InMiniProgramPlatform[],
): boolean {
  return (platform ? castArray(platform) : platforms).some(platform =>
    detectors[platform](),
  )
}
