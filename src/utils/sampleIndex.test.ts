import { sampleIndex } from './sampleIndex'

describe('sampleIndex', () => {
  test('ok', () => {
    expect(sampleIndex([1, 2])).toBeOneOf([0, 1])
    expect(sampleIndex([])).toBeUndefined()
    expect(sampleIndex({ x: 1, y: 'o' })).toBeOneOf(['x', 'y'])
    expect(sampleIndex({})).toBeUndefined()
  })
})
