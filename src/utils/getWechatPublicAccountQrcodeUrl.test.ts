import { getWechatPublicAccountQrcodeUrl } from './getWechatPublicAccountQrcodeUrl.ts'

describe('getWechatPublicAccountQrcodeUrl', () => {
  test('表现正常', () => {
    expect(getWechatPublicAccountQrcodeUrl('rmrbwx')).toBe(
      'https://open.weixin.qq.com/qr/code?username=rmrbwx',
    )
  })
})
