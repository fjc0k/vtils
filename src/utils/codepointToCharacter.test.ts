import { codepointToCharacter } from './codepointToCharacter'

describe('codepointToCharacter', () => {
  test('ok', () => {
    expect(codepointToCharacter('3297-fe0f')).toBe('㊗️')
    expect(codepointToCharacter('1f4a1')).toBe('💡')
  })
})
