describe('getCurrentPageQuery', () => {
  beforeAll(() => {
    jest.mock('../utils/inMiniProgram', () => ({
      inMiniProgram: (): Partial<WechatMiniprogram.Wx> => ({}),
    }))
  })

  test('表现正常', async () => {
    const { getCurrentPageQuery } = await import('./getCurrentPageQuery')
    // @ts-ignore
    window.getCurrentPages = (() => [
      {
        route: '/pages/test',
        options: {
          id: '2',
          key: '123456',
        },
      },
    ]) as WechatMiniprogram.Page.getCurrentPages
    expect(getCurrentPageQuery()).toEqual({
      id: '2',
      key: '123456',
    })
  })
})
