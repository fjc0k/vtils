import { Calculator } from './Calculator'

describe('Calculator', () => {
  describe('加', () => {
    test('加数列表为空时返回0', () => {
      expect(Calculator.add()).toBe(0)
    })

    test('加数列表长度为1时返回第1个的值', () => {
      expect(Calculator.add(2.2)).toBe(2.2)
    })

    test('加数列表长度大于2时返回相加结果', () => {
      expect(0.1 + 0.2).not.toBe(0.3)
      expect(Calculator.add(0.1, 0.2)).toBe(0.3)

      expect(0.1 + 0.7).not.toBe(0.8)
      expect(Calculator.add(0.1, 0.7)).toBe(0.8)

      expect(0.2 + 0.4).not.toBe(0.6)
      expect(Calculator.add(0.2, 0.4)).toBe(0.6)
    })
  })

  describe('减', () => {
    test('减数列表为空时返回0', () => {
      expect(Calculator.sub()).toBe(0)
    })

    test('减数列表长度为1时返回第1个的值', () => {
      expect(Calculator.sub(2.2)).toBe(2.2)
    })

    test('减数列表长度大于2时返回相减结果', () => {
      expect(1 - 0.9).not.toBe(0.1)
      expect(Calculator.sub(1, 0.9)).toBe(0.1)

      expect(1.5 - 1.2).not.toBe(0.3)
      expect(Calculator.sub(1.5, 1.2)).toBe(0.3)
    })
  })

  describe('乘', () => {
    test('乘数列表为空时返回0', () => {
      expect(Calculator.mul()).toBe(0)
    })

    test('乘数列表长度为1时返回第1个的值', () => {
      expect(Calculator.mul(2.2)).toBe(2.2)
    })

    test('乘数列表长度大于2时返回相乘结果', () => {
      expect(0.8 * 3).not.toBe(2.4)
      expect(Calculator.mul(0.8, 3)).toBe(2.4)

      expect(0.55 * 100).not.toBe(55)
      expect(Calculator.mul(0.55, 100)).toBe(55)
    })
  })

  describe('除', () => {
    test('除数列表为空时返回0', () => {
      expect(Calculator.div()).toBe(0)
    })

    test('除数列表长度为1时返回第1个的值', () => {
      expect(Calculator.div(2.2)).toBe(2.2)
    })

    test('除数列表长度大于2时返回相除结果', () => {
      expect(0.3 / 0.1).not.toBe(3)
      expect(Calculator.div(0.3, 0.1)).toBe(3)

      expect(0.69 / 10).not.toBe(0.069)
      expect(Calculator.div(0.69, 10)).toBe(0.069)
    })
  })

  describe('银行家舍入法', () => {
    // https://baike.baidu.com/item/%E9%93%B6%E8%A1%8C%E5%AE%B6%E8%88%8D%E5%85%A5/4781630?fr=aladdin
    test('ok', () => {
      expect(Calculator.make({ decimalPlaces: 2 }).add(9, 0.825)).toBe(9.83)
      expect(
        Calculator.make({
          decimalPlaces: 2,
          rounding: Calculator.decimal.ROUND_HALF_EVEN,
        }).add(9, 0.825),
      ).toBe(9.82)
      expect(
        Calculator.make({
          decimalPlaces: 2,
          rounding: Calculator.decimal.ROUND_HALF_EVEN,
        }).add(9, 0.82501),
      ).toBe(9.83)
    })
  })
})
