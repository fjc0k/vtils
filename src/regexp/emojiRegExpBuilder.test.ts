import { emojiRegExpBuilder } from './emojiRegExpBuilder'

describe('emojiRegExpBuilder', () => {
  test('test', () => {
    expect(emojiRegExpBuilder.build().test('😌')).toBeTrue()
    expect(emojiRegExpBuilder.build().test('👪')).toBeTrue()
    expect(emojiRegExpBuilder.build().test('👪a')).toBeTrue()
    expect(emojiRegExpBuilder.build().test('abc')).toBeFalse()
    expect(emojiRegExpBuilder.build().test('😌👪')).toBeTrue()
  })

  test('test-exact', () => {
    expect(emojiRegExpBuilder.build({ exact: true }).test('😌')).toBeTrue()
    expect(emojiRegExpBuilder.build({ exact: true }).test('👪')).toBeTrue()
    expect(emojiRegExpBuilder.build({ exact: true }).test('👪a')).toBeFalse()
    expect(emojiRegExpBuilder.build({ exact: true }).test('abc')).toBeFalse()
    expect(emojiRegExpBuilder.build({ exact: true }).test('😌👪')).toBeFalse()
  })

  test('test-exact-repeat', () => {
    expect(
      emojiRegExpBuilder.build({ exact: true, repeat: true }).test('😌'),
    ).toBeTrue()
    expect(
      emojiRegExpBuilder.build({ exact: true, repeat: true }).test('👪'),
    ).toBeTrue()
    expect(
      emojiRegExpBuilder.build({ exact: true, repeat: true }).test('👪a'),
    ).toBeFalse()
    expect(
      emojiRegExpBuilder.build({ exact: true, repeat: true }).test('abc'),
    ).toBeFalse()
    expect(
      emojiRegExpBuilder.build({ exact: true, repeat: true }).test('😌👪'),
    ).toBeTrue()
  })

  test('match', () => {
    expect('😌'.match(emojiRegExpBuilder.build())![0]).toBe('😌')
    expect('👪'.match(emojiRegExpBuilder.build())![0]).toBe('👪')
    expect('👪a'.match(emojiRegExpBuilder.build())![0]).toBe('👪')
    expect('abc'.match(emojiRegExpBuilder.build())).toBeNull()
    expect('😌👪'.match(emojiRegExpBuilder.build())![0]).toBe('😌')
  })

  test('match-global', () => {
    expect(
      [...'😌'.matchAll(emojiRegExpBuilder.build({ global: true }))].map(
        item => item[0],
      ),
    ).toEqual(['😌'])
    expect(
      [...'👪'.matchAll(emojiRegExpBuilder.build({ global: true }))].map(
        item => item[0],
      ),
    ).toEqual(['👪'])
    expect(
      [...'👪a'.matchAll(emojiRegExpBuilder.build({ global: true }))].map(
        item => item[0],
      ),
    ).toEqual(['👪'])
    expect(
      [...'abc'.matchAll(emojiRegExpBuilder.build({ global: true }))].map(
        item => item[0],
      ),
    ).toEqual([])
    expect(
      [...'😌👪'.matchAll(emojiRegExpBuilder.build({ global: true }))].map(
        item => item[0],
      ),
    ).toEqual(['😌', '👪'])
  })

  test('match-global-repeat', () => {
    expect(
      [
        ...'😌'.matchAll(
          emojiRegExpBuilder.build({ global: true, repeat: true }),
        ),
      ].map(item => item[0]),
    ).toEqual(['😌'])
    expect(
      [
        ...'👪'.matchAll(
          emojiRegExpBuilder.build({ global: true, repeat: true }),
        ),
      ].map(item => item[0]),
    ).toEqual(['👪'])
    expect(
      [
        ...'👪a'.matchAll(
          emojiRegExpBuilder.build({ global: true, repeat: true }),
        ),
      ].map(item => item[0]),
    ).toEqual(['👪'])
    expect(
      [
        ...'abc'.matchAll(
          emojiRegExpBuilder.build({ global: true, repeat: true }),
        ),
      ].map(item => item[0]),
    ).toEqual([])
    expect(
      [
        ...'😌👪'.matchAll(
          emojiRegExpBuilder.build({ global: true, repeat: true }),
        ),
      ].map(item => item[0]),
    ).toEqual(['😌👪'])
  })

  test('getBaseRegExp', () => {
    expect(
      new RegExp(`(${emojiRegExpBuilder.getBaseRegExp().source})[A-Z]`).test(
        '😌',
      ),
    ).toBeFalse()
    expect(
      new RegExp(`(${emojiRegExpBuilder.getBaseRegExp().source})[A-Z]`).test(
        '😌X',
      ),
    ).toBeTrue()
  })
})
