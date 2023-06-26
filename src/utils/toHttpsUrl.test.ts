import { toHttpsUrl } from './toHttpsUrl'

describe('toHttpsUrl', () => {
  test('ok', () => {
    expect(toHttpsUrl('http://baidu.com')).toBe('https://baidu.com')
    expect(toHttpsUrl('HTTP://baidu.com')).toBe('https://baidu.com')
    expect(toHttpsUrl('https://baidu.com')).toBe('https://baidu.com')
  })
})
