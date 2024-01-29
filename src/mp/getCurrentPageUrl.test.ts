describe('getCurrentPageUrl', () => {
  beforeAll(() => {
    jest.mock('../utils/inMiniProgram', () => ({
      inMiniProgram: (): Partial<WechatMiniprogram.Wx> => ({}),
    }))
  })

  test('表现正常', async () => {
    const { getCurrentPageUrl } = await import('./getCurrentPageUrl.ts')
    // @ts-ignore
    window.getCurrentPages = (() => [
      {
        route: '/pages/test',
        options: {
          id: '2',
          key: '123456',
        },
      },
    ]) as WechatMiniprogram.Page.GetCurrentPages
    expect(getCurrentPageUrl()).toBe('/pages/test?id=2&key=123456')
  })
})
