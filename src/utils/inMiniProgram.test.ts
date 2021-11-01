import { inMiniProgram } from './inMiniProgram'

const fakeMiniProgramFactory: Partial<WechatMiniprogram.Wx> = {
  getSystemInfoSync() {
    return {} as any
  },
}

describe('inMiniProgram', () => {
  test('表现正常', () => {
    expect(inMiniProgram()).toBeFalse()
    expect(inMiniProgram('微信')).toBeFalse()
    expect(inMiniProgram('百度')).toBeFalse()
    expect(inMiniProgram(['微信', '支付宝'])).toBeFalse()
    Object.assign(window, {
      wx: fakeMiniProgramFactory,
      my: fakeMiniProgramFactory,
    })
    expect(inMiniProgram()).toBe(fakeMiniProgramFactory)
    expect(inMiniProgram('微信')).toBe(fakeMiniProgramFactory)
    expect(inMiniProgram('百度')).toBeFalse()
    expect(inMiniProgram(['微信', '支付宝'])).toBe(fakeMiniProgramFactory)
    Object.assign(window, {
      swan: fakeMiniProgramFactory,
    })
    expect(inMiniProgram('百度')).toBe(fakeMiniProgramFactory)
  })
})
