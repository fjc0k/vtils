Object.defineProperty(window.navigator, 'userAgent', {
  writable: true,
})

describe('inAndroid', () => {
  afterEach(() => {
    jest.resetModules()
  })

  test('不在 Android 设备中', async () => {
    const { inAndroid } = await import('./inAndroid')
    // @ts-ignore
    window.navigator.userAgent = 'x'
    expect(inAndroid()).toBeFalse()
  })

  test('在 Android 设备中', async () => {
    const { inAndroid } = await import('./inAndroid')
    // @ts-ignore
    window.navigator.userAgent = 'xx android yy'
    expect(inAndroid()).toBeTrue()
  })
})
