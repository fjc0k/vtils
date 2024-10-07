import { orderByRules } from './orderByRules'

const strData = ['hello', 'fjc', '20', '花间一壶酒', '=']

const numData = [-5, 4, 0, 1.2, 20]

const arrData = [
  { a: 'x', b: 3 },
  { a: 'y', b: 4 },
  { a: 'x', b: 1 },
  { a: 'z', b: 1 },
  { a: 'y', b: 2 },
]

describe('orderByRules', () => {
  test('desc 正常', () => {
    expect(
      orderByRules(strData, {
        iteratee: item => item.length,
        type: 'desc',
      }),
    ).toEqual(['hello', '花间一壶酒', 'fjc', '20', '='])

    expect(
      orderByRules(numData, {
        iteratee: item => item,
        type: 'desc',
      }),
    ).toEqual([20, 4, 1.2, 0, -5])

    expect(
      orderByRules(arrData, {
        iteratee: item => item.b,
        type: 'desc',
      }),
    ).toEqual([
      { a: 'y', b: 4 },
      { a: 'x', b: 3 },
      { a: 'y', b: 2 },
      { a: 'x', b: 1 },
      { a: 'z', b: 1 },
    ])
  })

  test('asc 正常', () => {
    expect(
      orderByRules(strData, {
        iteratee: item => item.length,
        type: 'asc',
      }),
    ).toEqual(['=', '20', 'fjc', 'hello', '花间一壶酒'])

    expect(
      orderByRules(numData, {
        iteratee: item => item,
        type: 'asc',
      }),
    ).toEqual([-5, 0, 1.2, 4, 20])

    expect(
      orderByRules(arrData, {
        iteratee: item => item.b,
        type: 'asc',
      }),
    ).toEqual([
      { a: 'x', b: 1 },
      { a: 'z', b: 1 },
      { a: 'y', b: 2 },
      { a: 'x', b: 3 },
      { a: 'y', b: 4 },
    ])
  })

  test('多个规则正常', () => {
    expect(
      orderByRules(arrData, [
        {
          iteratee: item => item.b,
          type: 'desc',
        },
        {
          iteratee: item => item.a.charCodeAt(0),
          type: 'asc',
        },
      ]),
    ).toEqual([
      { a: 'x', b: 3 },
      { a: 'x', b: 1 },
      { a: 'y', b: 4 },
      { a: 'y', b: 2 },
      { a: 'z', b: 1 },
    ])

    expect(
      orderByRules(arrData, [
        {
          iteratee: item => item.b,
          type: 'desc',
        },
        {
          iteratee: item => item.a.charCodeAt(0),
          type: 'desc',
        },
      ]),
    ).toEqual([
      { a: 'z', b: 1 },
      { a: 'y', b: 4 },
      { a: 'y', b: 2 },
      { a: 'x', b: 3 },
      { a: 'x', b: 1 },
    ])
  })

  test('数组规则正常', () => {
    expect(orderByRules(strData, [item => item.length, 'desc'])).toEqual([
      'hello',
      '花间一壶酒',
      'fjc',
      '20',
      '=',
    ])

    expect(orderByRules(numData, [item => item, 'asc'])).toEqual([
      -5, 0, 1.2, 4, 20,
    ])

    expect(
      orderByRules(arrData, [
        {
          iteratee: item => item.b,
          type: 'desc',
        },
        [item => item.a.charCodeAt(0), 'asc'],
      ]),
    ).toEqual([
      { a: 'x', b: 3 },
      { a: 'x', b: 1 },
      { a: 'y', b: 4 },
      { a: 'y', b: 2 },
      { a: 'z', b: 1 },
    ])
  })
})
