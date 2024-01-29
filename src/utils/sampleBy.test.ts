import { nthArg } from 'lodash-uni'
import { sampleBy } from './sampleBy.ts'

describe('sampleBy', () => {
  test('ok', () => {
    expect(sampleBy([1, 2], (_, i) => i)).toBeOneOf([0, 1])
    expect(sampleBy([1, 2], nthArg(1))).toBeOneOf([0, 1])
    expect(sampleBy([], (_, i) => i)).toBeUndefined()
    expect(sampleBy({ x: 1, y: 'dd' }, (_, k) => k)).toBeOneOf(['x', 'y'])
    expect(sampleBy({}, (_, k) => k)).toBeUndefined()
  })
})
