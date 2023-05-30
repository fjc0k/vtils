import { makeConditionalArray } from './makeConditionalArray'

describe('makeConditionalArray', () => {
  test('ok', () => {
    type Item = {
      id: number
    }
    expect(
      makeConditionalArray([
        {
          id: 1,
        },
        false,
        {
          id: 4,
        },
      ] as Item[]),
    ).toEqual([
      {
        id: 1,
      },
      {
        id: 4,
      },
    ])

    const makeConditionalArrayFork = makeConditionalArray.fork<Item>()
    expect(
      makeConditionalArrayFork([
        {
          id: 1,
        },
        false,
        {
          id: 4,
        },
        {
          id: 6,
        },
        false,
        false,
        {
          id: 0,
        },
      ]),
    ).toEqual([
      {
        id: 1,
      },
      {
        id: 4,
      },
      {
        id: 6,
      },
      {
        id: 0,
      },
    ])
  })

  test('children', () => {
    type Item = {
      id: number
      sub: Item[]
    }
    const makeConditionalArrayFork = makeConditionalArray.fork<Item, 'sub'>(
      'sub',
    )
    expect(
      makeConditionalArrayFork([
        {
          id: 1,
          sub: [],
        },
        false,
        {
          id: 4,
          sub: [],
        },
        {
          id: 6,
          sub: [],
        },
        false,
        false,
        {
          id: 0,
          sub: [
            {
              id: 100,
              sub: [],
            },
            false,
            {
              id: 101,
              sub: [],
            },
          ],
        },
      ]),
    ).toEqual([
      {
        id: 1,
        sub: [],
      },
      {
        id: 4,
        sub: [],
      },
      {
        id: 6,
        sub: [],
      },
      {
        id: 0,
        sub: [
          {
            id: 100,
            sub: [],
          },
          {
            id: 101,
            sub: [],
          },
        ],
      },
    ])
  })
})
