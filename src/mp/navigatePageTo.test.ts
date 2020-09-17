describe('navigatePageTo', () => {
  const navigateTo = jest
    .fn()
    .mockImplementation((options: WechatMiniprogram.NavigateToOption) => {
      if (options.url.includes('fail')) {
        options.fail?.({} as any)
      } else {
        options.success?.({} as any)
      }
    })
  const redirectTo = jest
    .fn()
    .mockImplementation((options: WechatMiniprogram.RedirectToOption) => {
      options.success?.({} as any)
    })
  const switchTab = jest
    .fn()
    .mockImplementation((options: WechatMiniprogram.SwitchTabOption) => {
      options.success?.({} as any)
    })

  beforeAll(() => {
    jest.mock('../utils/inMiniProgram', () => ({
      inMiniProgram: (): Partial<WechatMiniprogram.Wx> => ({
        navigateTo: navigateTo,
        redirectTo: redirectTo,
        switchTab: switchTab,
      }),
    }))
    jest.mock(
      './miniProgramBus',
      () =>
        ({
          miniProgramBus: {
            once: (name, cb) => {
              cb()
            },
          },
        } as typeof import('./miniProgramBus')),
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('表现正常', async () => {
    const { navigatePageTo } = await import('./navigatePageTo')
    await navigatePageTo('/')
    expect(navigateTo).toBeCalled().toBeCalledTimes(1)
  })

  test('redirect 正常', async () => {
    const { navigatePageTo } = await import('./navigatePageTo')
    await navigatePageTo('/', undefined, true)
    expect(navigateTo).not.toBeCalled()
    expect(redirectTo).toBeCalled().toBeCalledTimes(1)
  })

  test('switchTab 兜底', async () => {
    const { navigatePageTo } = await import('./navigatePageTo')
    await navigatePageTo('/fail')
    expect(navigateTo).toBeCalled().toBeCalledTimes(1)
    expect(redirectTo).not.toBeCalled()
    expect(switchTab).toBeCalled().toBeCalledTimes(1)
  })

  test('支持 WEB URL', async () => {
    const { navigatePageTo } = await import('./navigatePageTo')
    const { setMiniProgramConfig } = await import('./miniProgramConfig')
    setMiniProgramConfig({
      webUrlToMiniProgramUrl: url => `/webview?url=${encodeURIComponent(url)}`,
    })
    await navigatePageTo('http://foo.bar')
    expect(navigateTo)
      .toBeCalled()
      .toBeCalledTimes(1)
      .toBeCalledWith(
        expect.objectContaining({
          url: `/webview?url=${encodeURIComponent('http://foo.bar')}`,
        }),
      )
  })

  test('无 query，支持 query', async () => {
    const { navigatePageTo } = await import('./navigatePageTo')
    await navigatePageTo('/detail', { id: 1 })
    expect(navigateTo)
      .toBeCalled()
      .toBeCalledTimes(1)
      .toBeCalledWith(
        expect.objectContaining({
          url: `/detail?id=1`,
        }),
      )
  })

  test('有 query，支持 query', async () => {
    const { navigatePageTo } = await import('./navigatePageTo')
    await navigatePageTo('/detail?key=2', { id: 1 })
    expect(navigateTo)
      .toBeCalled()
      .toBeCalledTimes(1)
      .toBeCalledWith(
        expect.objectContaining({
          url: `/detail?key=2&id=1`,
        }),
      )
  })
})
