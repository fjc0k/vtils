describe('submit', () => {
  const showLoading: any = jest.fn()
  const hideLoading: any = jest.fn()
  const showToast: any = jest.fn()

  beforeAll(() => {
    jest.mock('../utils/inMiniProgram', () => ({
      inMiniProgram: (): Partial<WechatMiniprogram.Wx> => ({
        showLoading: showLoading,
        hideLoading: hideLoading,
        showToast: showToast,
      }),
    }))
  })

  test('表现正常', async () => {
    const { submit } = await import('./submit')
    const { wait } = await import('../utils')
    const res = await submit(async _ => {
      await _.start('加载中...')
      await wait(500)
      await _.fail('加载失败')
      await _.success('加载成功')
      return 1
    })
    expect(showLoading)
      .toBeCalled()
      .toBeCalledTimes(1)
      .toBeCalledWith(
        expect.objectContaining({
          title: '加载中...',
        }),
      )
    expect(showToast).toBeCalled().toBeCalledTimes(2)
    expect(hideLoading).toBeCalled().toBeCalledTimes(3)
    expect(res).toBe(1)
  })
})
