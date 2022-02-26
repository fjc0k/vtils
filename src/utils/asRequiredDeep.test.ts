import { asRequiredDeep } from './asRequiredDeep'

describe('asRequiredDeep', () => {
  test('ok', () => {
    const obj: {
      x?: string
      y?: {
        z?: number
        x2: [
          {
            y2?: {
              z2: number
            }
          },
        ]
      }
    } = {
      y: {
        z: 2,
        x2: [{}],
      },
    }
    // @ts-expect-error
    const x = obj.y.z
    expect(x).toBe(2)

    const obj2 = asRequiredDeep(obj)
    const x2 = obj2.y.z
    expect(x2).toBe(2)
  })
})
