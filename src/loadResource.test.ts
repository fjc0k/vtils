import {jestExpectEqual} from './enhanceJest'
import {loadResource, LoadResourceUrlType} from './loadResource'

jest.spyOn(document.head, 'appendChild').mockImplementation((el: any) => {
  if (el.src && /returnError/.test(el.src)) {
    el.onerror && el.onerror()
  } else {
    el.onload && el.onload(el)
  }
  return el
})

test('只传入字符串时将根据后缀判断当作何种资源加载', async () => {
  // 默认 js
  const [jsEl] = await loadResource('https://foo.bar')
  jestExpectEqual(
    jsEl.tagName,
    'SCRIPT',
  )

  // 图片后缀
  const [imgEl] = await loadResource('https://foo.bar/img.png')
  jestExpectEqual(
    imgEl.tagName,
    'IMG',
  )

  // 样式后缀
  const [styleEl] = await loadResource('https://foo.bar/style.css')
  jestExpectEqual(
    styleEl.tagName,
    'LINK',
  )
})

test('可传入 LoadResourceUrl 指定加载的资源类型', async () => {
  const [jsEl] = await loadResource({
    type: LoadResourceUrlType.js,
    path: 'https://foo.bar/js',
  })
  jestExpectEqual(
    jsEl.tagName,
    'SCRIPT',
  )

  const [styleEl] = await loadResource({
    type: LoadResourceUrlType.css,
    path: 'https://foo.bar/css',
  })
  jestExpectEqual(
    styleEl.tagName,
    'LINK',
  )

  const [imgEl] = await loadResource({
    type: LoadResourceUrlType.img,
    path: 'https://foo.bar/img',
  })
  jestExpectEqual(
    imgEl.tagName,
    'IMG',
  )
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

  jestExpectEqual(
    jsEl.tagName,
    'SCRIPT',
  )
  jestExpectEqual(
    styleEl.tagName,
    'LINK',
  )
  jestExpectEqual(
    imgEl.tagName,
    'IMG',
  )
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

  jestExpectEqual(
    jsEl.tagName,
    'SCRIPT',
  )

  jestExpectEqual(
    (jsEl as any).src,
    alternatePath,
  )
})
