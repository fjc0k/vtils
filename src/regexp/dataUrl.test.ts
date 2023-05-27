import { dataUrlRegExpBuilder } from './dataUrl'

describe('dataUrlRegExpBuilder', () => {
  test('test', () => {
    expect(dataUrlRegExpBuilder.build().test('data:,Hello World!')).toBeTrue()
    expect(dataUrlRegExpBuilder.build().test('http://baidu.com')).toBeFalse()
  })
})
