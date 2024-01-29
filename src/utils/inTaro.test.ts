import { inTaro } from './inTaro.ts'

describe('inTaro', () => {
  test('表现正常', () => {
    expect(inTaro()).toBeFalse()
    Object.defineProperty(navigator, 'product', {
      value: 'Taro',
    })
    expect(inTaro()).toBeTrue()
  })
})
