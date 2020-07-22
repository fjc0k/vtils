import { inMiniProgram } from './inMiniProgram'

const fakeMiniProgramFactory = {
  getSystemInfo() {
    return {}
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
    expect(inMiniProgram()).toBeTrue()
    expect(inMiniProgram('微信')).toBeTrue()
    expect(inMiniProgram('百度')).toBeFalse()
    expect(inMiniProgram(['微信', '支付宝'])).toBeTrue()
    Object.assign(window, {
      swan: fakeMiniProgramFactory,
    })
    expect(inMiniProgram('百度')).toBeTrue()
  })
})
