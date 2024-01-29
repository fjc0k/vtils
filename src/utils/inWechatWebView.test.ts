Object.defineProperty(window.navigator, 'userAgent', {
  writable: true,
})

describe('inWechatWebView', () => {
  afterEach(() => {
    jest.resetModules()
  })

  test('不在微信内置浏览器中', async () => {
    const { inWechatWebView } = await import('./inWechatWebView.ts')
    // @ts-ignore
    window.navigator.userAgent = 'x'
    expect(inWechatWebView()).toBeFalse()
  })

  test('在微信内置浏览器中', async () => {
    const { inWechatWebView } = await import('./inWechatWebView.ts')
    // @ts-ignore
    window.navigator.userAgent = 'xx MicroMessenger yy'
    expect(inWechatWebView()).toBeTrue()
  })
})
