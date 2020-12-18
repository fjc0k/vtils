import { cloneDeepFast } from './cloneDeepFast'

describe('cloneDeepFast', () => {
  test('表现正常', () => {
    const value = { x: [1] }
    expect(cloneDeepFast(value)).not.toBe(value)
    expect(cloneDeepFast(value).x).not.toBe(value.x)
    expect(cloneDeepFast(value)).toEqual(value)
  })
})
