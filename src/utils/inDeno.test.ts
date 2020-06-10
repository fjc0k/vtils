describe('inDeno', () => {
  afterEach(() => {
    jest.resetModules()
  })

  test('不在 Deno 中', async () => {
    const { inDeno } = await import('./inDeno')
    // @ts-ignore
    window.Deno = {}
    expect(inDeno()).toBeFalse()
  })

  test('在 Deno 中', async () => {
    const { inDeno } = await import('./inDeno')
    // @ts-ignore
    window.Deno = { version: { deno: '1.0.0' } }
    expect(inDeno()).toBeTrue()
  })
})
