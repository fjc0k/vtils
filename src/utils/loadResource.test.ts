import { loadResource, LoadResourceUrlType } from './loadResource.ts'

describe('loadResource', () => {
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

  test('只传入字符串时将根据后缀判断当作何种资源加载', async () => {
    // 默认 js
    const [jsEl] = await loadResource('https://foo.bar')
    expect(jsEl.tagName).toBe('SCRIPT')

    // 图片后缀
    const [imgEl] = await loadResource('https://foo.bar/img.png')
    expect(imgEl.tagName).toBe('IMG')

    // 样式后缀
    const [cssEl] = await loadResource('https://foo.bar/style.css')
    expect(cssEl.tagName).toBe('LINK')
  })

  test('可传入 LoadResourceUrl 指定加载的资源类型', async () => {
    const [jsEl] = await loadResource({
      type: LoadResourceUrlType.js,
      path: 'https://foo.bar/js',
    })
    expect(jsEl.tagName).toBe('SCRIPT')

    const [styleEl] = await loadResource({
      type: LoadResourceUrlType.css,
      path: 'https://foo.bar/css',
    })
    expect(styleEl.tagName).toBe('LINK')

    const [imgEl] = await loadResource({
      type: LoadResourceUrlType.img,
      path: 'https://foo.bar/img',
    })
    expect(imgEl.tagName).toBe('IMG')
  })

  test('可传入一个数组，异步加载多个资源', async () => {
    const [jsEl, styleEl, imgEl] = await loadResource([
      'https://foo.bar/js',
      {
        type: LoadResourceUrlType.css,
        path: 'https://foo.bar/css',
      },
      {
        type: LoadResourceUrlType.img,
        path: 'https://foo.bar/img',
      },
    ])

    expect(jsEl.tagName).toBe('SCRIPT')
    expect(styleEl.tagName).toBe('LINK')
    expect(imgEl.tagName).toBe('IMG')
  })

  test('资源加载出错时抛出错误', async () => {
    const jsPath = 'https://foo.bar/returnError'

    expect(
      loadResource({
        type: LoadResourceUrlType.js,
        path: jsPath,
      }).catch(el => Promise.reject(el.src)),
    ).rejects.toMatch(jsPath)

    expect(
      loadResource([
        'https://foo.bar/x.jpg',
        {
          type: LoadResourceUrlType.js,
          path: jsPath,
        },
      ]).catch(el => Promise.reject(el.src)),
    ).rejects.toMatch(jsPath)
  })

  test('主资源加载出错时支持加载备用资源', async () => {
    const alternatePath = 'https://foo.bar/alternate'
    const [jsEl] = await loadResource({
      type: LoadResourceUrlType.js,
      path: 'https://foo.bar/returnError',
      alternatePath: alternatePath,
    })

    expect(jsEl.tagName).toBe('SCRIPT')
    expect((jsEl as any).src).toBe(alternatePath)
  })

  test('代码资源应插入 DOM', async () => {
    const src = 'http://foo.bar/this-is-an-script.js'
    await loadResource(src)
    expect(document.documentElement.outerHTML).toInclude(src)
  })

  test('样式资源应插入 DOM', async () => {
    const src = 'http://foo.bar/this-is-an-css.css'
    await loadResource(src)
    expect(document.documentElement.outerHTML).toInclude(src)
  })

  test('图片资源不插入 DOM', async () => {
    const src = 'http://foo.bar/this-is-an-image.jpg'
    await loadResource(src)
    expect(document.documentElement.outerHTML).not.toInclude(src)
  })

  test('支持全局 hook', async () => {
    const src = 'http://foo.bar/this-is-an-image.js'
    await loadResource(
      {
        type: LoadResourceUrlType.js,
        path: src,
      },
      {
        hook: el => {
          el.dataset.hooked = '1111'
        },
      },
    )
    expect(
      document.documentElement.querySelector(`[data-hooked="1111"]`)!.tagName,
    ).toBe('SCRIPT')
  })

  test('支持局部 hook', async () => {
    const src = 'http://foo.bar/this-is-an-image.js'
    await loadResource({
      type: LoadResourceUrlType.js,
      path: src,
      hook: el => {
        el.dataset.hooked = '2222'
      },
    })
    expect(
      document.documentElement.querySelector(`[data-hooked="2222"]`)!.tagName,
    ).toBe('SCRIPT')
  })

  test('可加载 js 代码文本', async () => {
    const code = 'window.__x__ = 1'
    const [el] = await loadResource({
      type: LoadResourceUrlType.jsText,
      path: code,
    })
    expect(el.tagName).toBe('SCRIPT')
    expect(el.textContent).toBe(code)
    expect((window as any).__x__).toBe(1)
  })

  test('可加载 css 样式文本', async () => {
    const code = 'body { font-size: 20px; }'
    const [el] = await loadResource({
      type: LoadResourceUrlType.cssText,
      path: code,
    })
    expect(el.tagName).toBe('STYLE')
    expect(el.textContent).toBe(code)
  })
})
