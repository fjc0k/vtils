import { Calculator } from './Calculator'

describe('Calculator', () => {
  test('加正常', () => {
    expect(0.1 + 0.2).not.toBe(0.3)
    expect(Calculator.add(0.1, 0.2)).toBe(0.3)

    expect(0.1 + 0.7).not.toBe(0.8)
    expect(Calculator.add(0.1, 0.7)).toBe(0.8)

    expect(0.2 + 0.4).not.toBe(0.6)
    expect(Calculator.add(0.2, 0.4)).toBe(0.6)
  })

  test('减正常', () => {
    expect(1 - 0.9).not.toBe(0.1)
    expect(Calculator.sub(1, 0.9)).toBe(0.1)

    expect(1.5 - 1.2).not.toBe(0.3)
    expect(Calculator.sub(1.5, 1.2)).toBe(0.3)
  })

  test('乘正常', () => {
    expect(0.8 * 3).not.toBe(2.4)
    expect(Calculator.mul(0.8, 3)).toBe(2.4)

    expect(0.55 * 100).not.toBe(55)
    expect(Calculator.mul(0.55, 100)).toBe(55)
  })

  test('除正常', () => {
    expect(0.3 / 0.1).not.toBe(3)
    expect(Calculator.div(0.3, 0.1)).toBe(3)

    expect(0.69 / 10).not.toBe(0.069)
    expect(Calculator.div(0.69, 10)).toBe(0.069)
  })
})
