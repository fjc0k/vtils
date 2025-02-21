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

  test('正确处理换行、tab等', () => {
    expect(toHalfWidthString('我１\r\n\t')).toBe('我1\r\n\t')
  })
})
