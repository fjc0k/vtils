import { toHalfWidthString } from './toHalfWidthString'

describe('toHalfWidthString', () => {
  test('ok', () => {
    expect(toHalfWidthString('　')).toBe(' ')
    expect(toHalfWidthString('１２３４５６７８９０')).toBe('1234567890')
    expect(
      toHalfWidthString('ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'),
    ).toBe('abcdefghijklmnopqrstuvwxyz')
    expect(toHalfWidthString('，＠！＃＆（）％｛｝')).toBe(',@!#&()%{}')
    expect(toHalfWidthString('【】“”。￥×')).not.toBe('[]"".$*')
  })
})
