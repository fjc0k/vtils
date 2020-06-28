import { traverse } from './traverse'

describe('traverse', () => {
  test('非对象或数组时不触发回调', () => {
    for (const item of [1, '3', /ff/, null, () => 1, true, class {}]) {
      const cb = jest.fn()
      traverse(item, cb)
      expect(cb).not.toBeCalled()
    }
  })

  test('是对象或数组时才触发回调', () => {
    for (const item of [{ 1: 2 }, [{ x: 1 }, [2]]]) {
      const cb = jest.fn()
      traverse(item, cb)
      expect(cb).toBeCalled()
    }
  })

  test('代码示例正常', () => {
    const values: any[] = []
    traverse([1, 2, { 3: 4 }], value => {
      values.push(value)
    })
    expect(values).toEqual([1, 2, { 3: 4 }, 4])
  })

  test('综合示例正常', () => {
    const obj = {
      x: {
        id: '2',
        name: 'dd',
        extra: [
          {
            id: 9,
          },
          {
            id: {
              tt: 0,
            },
            ttt: 1,
          },
        ],
      },
      y: [
        1,
        {
          id: 4,
          z: true,
        },
      ],
    }
    traverse(obj, (value, key, parent) => {
      if (key === 'id') {
        delete parent[key]
      }
    })
    expect(obj).toMatchSnapshot()
  })
})
