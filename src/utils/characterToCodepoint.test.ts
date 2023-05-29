import { characterToCodepoint } from './characterToCodepoint'

describe('characterToCodepoint', () => {
  test('ok', () => {
    expect(characterToCodepoint('㊗️')).toBe('3297-fe0f')
    expect(characterToCodepoint('💡')).toBe('1f4a1')
  })
})
