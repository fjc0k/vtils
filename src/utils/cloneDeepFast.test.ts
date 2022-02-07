import { cloneDeepFast } from './cloneDeepFast'

describe('cloneDeepFast', () => {
  test('表现正常', () => {
    expect(cloneDeepFast(1)).toEqual(1)
    expect(cloneDeepFast('ddd')).toEqual('ddd')

    const now = new Date()
    expect(cloneDeepFast(now)).not.toBe(now)
    expect(cloneDeepFast(now)).toEqual(now)

    const ignoreValue = {}
    const value = {
      x: [1, new Date(), { o: 'o' }],
      d: new Date(),
      z: null,
      y: undefined,
      s: 'string',
      ignore: ignoreValue,
    }
    Object.defineProperty(value, 'no', {
      value: 'no',
      enumerable: false,
    })
    expect(cloneDeepFast(value)).not.toBe(value)
    expect(cloneDeepFast(value).x).not.toBe(value.x)
    expect(cloneDeepFast(value).d).not.toBe(value.d)
    expect(cloneDeepFast(value)).toEqual(value)
    // @ts-expect-error
    expect(value.no).toBe('no')
    // @ts-expect-error
    expect(cloneDeepFast(value).no).toBeUndefined()
    expect(cloneDeepFast(value, v => v === ignoreValue).ignore).toBe(
      value.ignore,
    )
  })
})
