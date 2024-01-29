describe('getCurrentPagePath', () => {
  beforeAll(() => {
    jest.mock('../utils/inMiniProgram', () => ({
      inMiniProgram: (): Partial<WechatMiniprogram.Wx> => ({}),
    }))
  })

  test('表现正常', async () => {
    const { getCurrentPagePath } = await import('./getCurrentPagePath.ts')
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
    expect(getCurrentPagePath()).toBe('/pages/test')
  })
})
