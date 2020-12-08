import { loadCss } from './loadCss'

describe('loadCss', () => {
  const createElement = document.createElement.bind(document)
  beforeAll(() => {
    jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = createElement(tag)
      setTimeout(() => {
        if (
          /returnError/.test(
            (el as HTMLScriptElement).src || (el as HTMLLinkElement).href,
          )
        ) {
          el.onerror?.(new Event('error'))
        } else {
          el.onload?.(new Event('load'))
        }
      }, 0)
      return el
    })
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  test('加载链接', async () => {
    const css = await loadCss(`http://foo.bar/x.css`)
    const css2 = await loadCss(`http://foo.bar/x.css`)
    expect(css.el).toBe(css2.el)
    expect(css.el.outerHTML).toMatchSnapshot()
    expect(document.documentElement.outerHTML).toMatchSnapshot()
    css.destroy()
  })

  test('加载内容', async () => {
    const css = await loadCss(`body {font-size: 20px}`)
    const css2 = await loadCss(`body {font-size: 20px}`)
    expect(css.el).toBe(css2.el)
    expect(css.el.outerHTML).toMatchSnapshot()
    expect(document.documentElement.outerHTML).toMatchSnapshot()
    css.destroy()
  })
})
