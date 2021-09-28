import { devOrProd } from './devOrProd'

describe('devOrProd', () => {
  beforeEach(() => {
    delete process.env.NODE_ENV
  })

  test('空值被认为是生产环境', () => {
    delete process.env.NODE_ENV
    expect(devOrProd(1, 2)).toBe(2)
    process.env.NODE_ENV = ''
    expect(devOrProd(1, 2)).toBe(2)
  })

  test('production', () => {
    process.env.NODE_ENV = 'production'
    expect(devOrProd(1, 2)).toBe(2)
  })

  test('prod', () => {
    process.env.NODE_ENV = 'prod'
    expect(devOrProd(1, 2)).toBe(2)
  })

  test('development', () => {
    process.env.NODE_ENV = 'development'
    expect(devOrProd(1, 2)).toBe(1)
  })

  test('dev', () => {
    process.env.NODE_ENV = 'dev'
    expect(devOrProd(1, 2)).toBe(1)
  })

  test('函数', () => {
    process.env.NODE_ENV = 'prod'
    expect(devOrProd(1, () => 2)).toBe(2)
    expect(
      devOrProd(
        () => 100,
        () => 4,
      ),
    ).toBe(4)
  })
})
