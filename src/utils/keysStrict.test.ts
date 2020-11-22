import { keys } from 'lodash-uni'
import { keysStrict } from './keysStrict'

describe(keysStrict.name, () => {
  test('就是 keys 的严格类型版', () => {
    expect(keysStrict).toBe(keys)

    expect(
      keysStrict({
        x: 1,
        y: '2',
        z: /d/,
      }).sort(),
    ).toEqual(['x', 'y', 'z'].sort())
  })
})
