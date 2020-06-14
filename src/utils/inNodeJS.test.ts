Object.defineProperty(global.process, 'versions', {
  writable: true,
})

describe('inNodeJS', () => {
  afterEach(() => {
    jest.resetModules()
  })

  test('不在 Node.js 中', async () => {
    const { inNodeJS } = await import('./inNodeJS')
    // @ts-ignore
    global.process.versions = {}
    expect(inNodeJS()).toBeFalse()
  })

  test('在 Node.js 中', async () => {
    const { inNodeJS } = await import('./inNodeJS')
    // @ts-ignore
    global.process.versions = { node: '8.0.0' }
    expect(inNodeJS()).toBeTrue()
  })
})
