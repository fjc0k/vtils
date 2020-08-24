describe('getTopBarInfo', () => {
  const getMenuButtonBoundingClientRect: any = jest
    .fn()
    .mockImplementation(() => ({
      width: 87,
      height: 32,
      left: 223,
      top: 24,
      right: 310,
      bottom: 56,
    }))
  const getSystemInfoSync: any = jest.fn().mockImplementation(() => ({
    model: 'iPhone 5',
    pixelRatio: 2,
    windowWidth: 320,
    windowHeight: 520,
    system: 'iOS 10.0.1',
    language: 'zh_CN',
    version: '7.0.4',
    screenWidth: 320,
    screenHeight: 568,
    SDKVersion: '2.8.0',
    brand: 'devtools',
    fontSizeSetting: 16,
    batteryLevel: 100,
    statusBarHeight: 20,
    safeArea: {
      right: 320,
      bottom: 568,
      left: 0,
      top: 20,
      width: 320,
      height: 548,
    },
    deviceOrientation: 'portrait',
    platform: 'devtools',
  }))

  beforeAll(() => {
    jest.mock('../utils/inMiniProgram', () => ({
      inMiniProgram: (): Partial<WechatMiniprogram.Wx> => ({
        getMenuButtonBoundingClientRect: getMenuButtonBoundingClientRect,
        getSystemInfoSync: getSystemInfoSync,
      }),
    }))
  })

  test('表现正常', async () => {
    const { getTopBarInfo } = await import('./getTopBarInfo')

    expect(getTopBarInfo()).toMatchSnapshot()
  })
})
