Object.defineProperty(window.navigator, 'userAgent', {
  writable: true,
})

describe('inAndroid', () => {
  afterEach(() => {
    jest.resetModules()
  })

  test('不在 Android 设备中', async () => {
    const { inAndroid } = await import('./inAndroid.ts')
    // @ts-ignore
    window.navigator.userAgent = 'x'
    expect(inAndroid()).toBeFalse()
  })

  test('在 Android 设备中', async () => {
    const { inAndroid } = await import('./inAndroid.ts')
    // @ts-ignore
    window.navigator.userAgent = 'xx android yy'
    expect(inAndroid()).toBeTrue()
  })

  test('<小程序> 不在 Android 设备中', async () => {
    const { inAndroid } = await import('./inAndroid.ts')
    // @ts-ignore
    window.wx = {
      getSystemInfoSync() {
        return {
          platform: 'devtools',
          system: '123',
        }
      },
    } as Partial<WechatMiniprogram.Wx>
    expect(inAndroid()).toBeFalse()
  })

  test('<小程序> 在 Android 设备中', async () => {
    const { inAndroid } = await import('./inAndroid.ts')
    // @ts-ignore
    window.wx = {
      getSystemInfoSync() {
        return {
          platform: 'android',
          system: '123',
        }
      },
    } as Partial<WechatMiniprogram.Wx>
    expect(inAndroid()).toBeTrue()
  })
})
