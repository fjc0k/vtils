import { omit } from 'lodash-es'
import { omitStrict } from './omitStrict'

describe(omitStrict.name, () => {
  test('就是 omit 的严格类型版', () => {
    expect(omitStrict).toBe(omit)

    expect(
      omitStrict(
        {
          x: 1,
          y: '2',
          z: /d/,
        },
        'x',
        ['z'],
      ),
    ).toEqual({ y: '2' })
  })
})
