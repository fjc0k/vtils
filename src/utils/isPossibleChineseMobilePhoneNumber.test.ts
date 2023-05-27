import { isPossibleChineseMobilePhoneNumber } from './isPossibleChineseMobilePhoneNumber'

describe('isPossibleChineseMobilePhoneNumber', () => {
  test('不可能是中国的手机号码', () => {
    for (const value of [
      '',
      110,
      120,
      10086,
      '180800300800',
      12345678,
      87654321,
    ]) {
      expect(isPossibleChineseMobilePhoneNumber(value)).toBeFalse()
    }
  })

  test('可能是中国的手机号码', () => {
    for (const value of [
      16080030080,
      18087030088,
      13907199856,
      '13591512420',
      19913769406,
      18512345657,
    ]) {
      expect(isPossibleChineseMobilePhoneNumber(value)).toBeTrue()
    }
  })
})
