import { toFullWidthString } from './toFullWidthString'

describe('toFullWidthString', () => {
  test('ok', () => {
    expect(toFullWidthString(' ')).toBe('　')
    expect(toFullWidthString('1234567890')).toBe('１２３４５６７８９０')
    expect(toFullWidthString('abcdefghijklmnopqrstuvwxyz')).toBe(
      'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ',
    )
    expect(toFullWidthString(',@!#&()%{}')).toBe('，＠！＃＆（）％｛｝')
    expect(toFullWidthString('[]"".$*')).not.toBe('【】“”。￥×')
  })

  test('正确处理换行、tab等', () => {
    expect(toFullWidthString('我1\r\n\t')).toBe('我１\r\n\t')
  })
})
