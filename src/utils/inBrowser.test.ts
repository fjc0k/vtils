Object.defineProperty(window.document, 'nodeType', {
  writable: true,
})

describe('inBrowser', () => {
  afterEach(() => {
    jest.resetModules()
  })

  test('不在浏览器中', async () => {
    const { inBrowser } = await import('./inBrowser')
    // @ts-ignore
    window.document.nodeType = undefined
    expect(inBrowser()).toBeFalse()
  })

  test('在浏览器中', async () => {
    const { inBrowser } = await import('./inBrowser')
    // @ts-ignore
    window.document.nodeType = 9
    expect(inBrowser()).toBeTrue()
  })
})
