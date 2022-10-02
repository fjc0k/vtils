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
})
