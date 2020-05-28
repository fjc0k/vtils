import { isChineseIDCardNumber } from './isChineseIDCardNumber'

describe(isChineseIDCardNumber.name, () => {
  test('不是合法的身份证号', () => {
    for (const value of [
      '2000',
      '190101881101231',
      '110101881301231',
      '110101198811214398',
      '11010119881101331a',
      '469001399208187005',
      '46900119925818180x',
      '530627199508918277',
      '110106100001019457', // 1000 年
      '140425900001017773', // 9000 年
    ]) {
      expect(isChineseIDCardNumber(value)).toBeFalse()
    }
  })

  test('是合法的身份证号', () => {
    for (const value of [
      '110101198811014398',
      '11010119881101331X',
      '469001199208187005',
      '46900119920818180x',
    ]) {
      expect(isChineseIDCardNumber(value)).toBeTrue()
    }
  })
})
