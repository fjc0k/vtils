import { pick } from 'lodash-uni'
import { pickStrict } from './pickStrict.ts'

describe(pickStrict.name, () => {
  test('就是 pick 的严格类型版', () => {
    expect(pickStrict).toBe(pick)

    expect(
      pickStrict(
        {
          x: 1,
          y: '2',
          z: /d/,
        },
        'x',
        ['y'],
      ),
    ).toEqual({ x: 1, y: '2' })
  })
})
