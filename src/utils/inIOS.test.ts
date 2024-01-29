Object.defineProperty(window.navigator, 'platform', {
  writable: true,
})

describe('inIOS', () => {
  afterEach(() => {
    jest.resetModules()
  })

  test('<浏览器> 不在 iOS 设备中', async () => {
    const { inIOS } = await import('./inIOS.ts')
    // @ts-ignore
    window.navigator.platform = 'x'
    expect(inIOS()).toBeFalse()
  })

  test('<浏览器> 在 iOS 设备中', async () => {
    const { inIOS } = await import('./inIOS.ts')
    // @ts-ignore
    window.navigator.platform = 'xx iPhone yy'
    expect(inIOS()).toBeTrue()
  })

  test('<小程序> 不在 iOS 设备中', async () => {
    const { inIOS } = await import('./inIOS.ts')
    // @ts-ignore
    window.wx = {
      getSystemInfoSync() {
        return {
          platform: 'devtools',
          system: '123',
        }
      },
    } as Partial<WechatMiniprogram.Wx>
    expect(inIOS()).toBeFalse()
  })

  test('<小程序> 在 iOS 设备中', async () => {
    const { inIOS } = await import('./inIOS.ts')
    // @ts-ignore
    window.wx = {
      getSystemInfoSync() {
        return {
          platform: 'ios',
          system: '123',
        }
      },
    } as Partial<WechatMiniprogram.Wx>
    expect(inIOS()).toBeTrue()
  })
})
