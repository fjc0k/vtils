import { isCuid } from './isCuid'

describe('isCuid', () => {
  test('ok', () => {
    expect(isCuid('cjld2cjxh0000qzrmn831i7rn')).toBeTrue()
    expect(isCuid('cjld2cyuq0000t3rmniod1foy')).toBeTrue()

    expect(isCuid('1')).toBeFalse()
    // @ts-expect-error
    expect(isCuid(2)).toBeFalse()
    // @ts-expect-error
    expect(isCuid(null)).toBeFalse()
    // @ts-expect-error
    expect(isCuid([])).toBeFalse()
  })
})
