import { blankCharsRegExpBuilder } from './blankChars.ts'

describe('blankCharsRegExpBuilder', () => {
  test('ok', () => {
    expect(blankCharsRegExpBuilder.build().test(' ')).toBeTrue()
    expect(blankCharsRegExpBuilder.build().test('我')).toBeFalse()
  })
})
