describe('navigatePageBack', () => {
  const navigateBack = jest
    .fn()
    .mockImplementation((options: WechatMiniprogram.NavigateBackOption) => {
      options.success?.({} as any)
    })

  beforeAll(() => {
    jest.mock('../utils/inMiniProgram', () => ({
      inMiniProgram: (): Partial<WechatMiniprogram.Wx> => ({
        navigateBack: navigateBack,
      }),
    }))
  })

  test('表现正常', async () => {
    const { navigatePageBack } = await import('./navigatePageBack')
    await navigatePageBack()
    expect(navigateBack).toBeCalled().toBeCalledTimes(1)
  })
})
