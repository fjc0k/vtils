import { phoneNumberRegExpBuilder } from './phoneNumber'

describe('chineseMobilePhoneNumberRegExpBuilder', () => {
  test('test', () => {
    expect(phoneNumberRegExpBuilder.build().test('18088040088')).toBeTrue()
    expect(phoneNumberRegExpBuilder.build().test('180880400889')).toBeTrue()
    expect(
      phoneNumberRegExpBuilder.build({ exact: true }).test('180880400889'),
    ).toBeFalse()
  })
})
