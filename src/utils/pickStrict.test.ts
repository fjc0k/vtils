import { pick } from 'lodash-es'
import { pickStrict } from './pickStrict'

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
