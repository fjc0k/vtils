import { DesensitizeStrategy, desensitize } from './desensitize'

describe('desensitize', () => {
  test('CHINESE_NAME', () => {
    expect(
      desensitize('成龙', {
        strategy: DesensitizeStrategy.CHINESE_NAME,
      }),
    ).toBe('成*')
    expect(
      desensitize('成龙', {
        strategy: DesensitizeStrategy.CHINESE_NAME,
        replacer: '#',
      }),
    ).toBe('成#')
    expect(
      desensitize('成龙', {
        strategy: DesensitizeStrategy.CHINESE_NAME,
        replacer: '##&',
      }),
    ).toBe('成##&')
    expect(
      desensitize('卡尔·滴滴末', {
        strategy: DesensitizeStrategy.CHINESE_NAME,
      }),
    ).toBe('卡*****')
  })

  test('CHINESE_ID_CARD_NUMBER', () => {
    expect(
      desensitize('5222404', {
        strategy: DesensitizeStrategy.CHINESE_ID_CARD_NUMBER,
      }),
    ).toBe('5****04')
  })

  test('CHINESE_MOBILE_PHONE_NUMBER', () => {
    expect(
      desensitize('1833339998', {
        strategy: DesensitizeStrategy.CHINESE_MOBILE_PHONE_NUMBER,
      }),
    ).toBe('183***9998')
  })

  test('EMAIL', () => {
    expect(
      desensitize('hell@gmail.com', {
        strategy: DesensitizeStrategy.EMAIL,
      }),
    ).toBe('h***@gmail.com')
  })

  test('preKeep', () => {
    expect(
      desensitize('hell@gmail.com', {
        preKeep: 2,
      }),
    ).toBe('he************')
    expect(
      desensitize('hell@gmail.com', {
        preKeep: 0,
      }),
    ).toBe('**************')
  })

  test('postKeep', () => {
    expect(
      desensitize('hell@gmail.com', {
        postKeep: 2,
      }),
    ).toBe('************om')
    expect(
      desensitize('hell@gmail.com', {
        postKeep: 0,
      }),
    ).toBe('**************')
  })

  test('preKeep & postKeep', () => {
    expect(
      desensitize('hell@gmail.com', {
        preKeep: 1,
        postKeep: 2,
      }),
    ).toBe('h***********om')
  })

  test('default', () => {
    expect(desensitize('hell@gmail.com')).toBe('**************')
  })

  test('empty', () => {
    expect(desensitize('')).toBe('')
  })
})
