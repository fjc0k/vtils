Object.defineProperty(window.navigator, 'platform', {
  writable: true,
})

describe('inIOS', () => {
  afterEach(() => {
    jest.resetModules()
  })

  test('不在 iOS 设备中', async () => {
    const { inIOS } = await import('./inIOS')
    // @ts-ignore
    window.navigator.platform = 'x'
    expect(inIOS()).toBeFalse()
  })

  test('在 iOS 设备中', async () => {
    const { inIOS } = await import('./inIOS')
    // @ts-ignore
    window.navigator.platform = 'xx iPhone yy'
    expect(inIOS()).toBeTrue()
  })
})
