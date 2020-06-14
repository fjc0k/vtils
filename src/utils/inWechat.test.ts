Object.defineProperty(window.navigator, 'userAgent', {
  writable: true,
})

describe('inWechat', () => {
  afterEach(() => {
    jest.resetModules()
  })

  test('不在微信内置浏览器中', async () => {
    const { inWechat } = await import('./inWechat')
    // @ts-ignore
    window.navigator.userAgent = 'x'
    expect(inWechat()).toBeFalse()
  })

  test('在微信内置浏览器中', async () => {
    const { inWechat } = await import('./inWechat')
    // @ts-ignore
    window.navigator.userAgent = 'xx MicroMessenger yy'
    expect(inWechat()).toBeTrue()
  })
})
