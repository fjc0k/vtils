import {getAbsoluteUrl} from './getAbsoluteUrl'
import {jestExpectEqual} from './enhanceJest'

const _URL = window.URL

test('本身是绝对链接表现正常', () => {
  const absoluteUrls = [
    'http://foo.bar',
    'https://foo.bar/dd.dd',
    'javascript:void(0)',
    'mailto:foo@bar.mail',
  ]

  absoluteUrls.forEach(url => {
    jestExpectEqual(
      getAbsoluteUrl(url),
      new _URL(url).href,
    )
  })

  ;(window as any).URL = undefined
  absoluteUrls.forEach(url => {
    jestExpectEqual(
      getAbsoluteUrl(url),
      new _URL(url).href,
    )
  })
  ;(window as any).URL = _URL
})

test('本身是相对链接表现正常', () => {
  const relativeUrls = [
    './foo',
    'bar',
    '../.././../foo/../.bar',
    '/foobar',
  ]

  relativeUrls.forEach(url => {
    jestExpectEqual(
      getAbsoluteUrl(url),
      new _URL(url, `${location.protocol}${location.host}`).href,
    )
  })

  ;(window as any).URL = undefined
  relativeUrls.forEach(url => {
    jestExpectEqual(
      getAbsoluteUrl(url),
      new _URL(url, `${location.protocol}${location.host}`).href,
    )
  })
  ;(window as any).URL = _URL
})
