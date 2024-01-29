const _Function = Function

describe('cartesianProduct', () => {
  describe('fast', () => {
    beforeAll(() => {
      jest.resetModules()
      global.Function = _Function
    })

    test('正常', async () => {
      const { cartesianProduct } = await import('./cartesianProduct.ts')

      expect(cartesianProduct([])).toEqual([])

      expect(cartesianProduct([[], []])).toEqual([])

      expect(cartesianProduct([['a']])).toEqual([['a']])

      expect(cartesianProduct([['a', 'b']])).toEqual([['a'], ['b']])

      expect(
        cartesianProduct([
          ['a', 'b'],
          [1, 2],
        ]),
      ).toEqual([
        ['a', 1],
        ['a', 2],
        ['b', 1],
        ['b', 2],
      ])

      // adding a 0 element set causes the entire product to be empty.
      expect(cartesianProduct([['a', 'b'], [1, 2], []])).toEqual([])

      expect(
        cartesianProduct([
          [1, 2],
          ['a', 'b', 'c'],
        ]),
      ).toEqual([
        [1, 'a'],
        [1, 'b'],
        [1, 'c'],
        [2, 'a'],
        [2, 'b'],
        [2, 'c'],
      ])

      expect(
        cartesianProduct([
          ['a', 'b'],
          [1, 2],
          [[], {}],
        ]),
      ).toEqual([
        ['a', 1, []],
        ['a', 1, {}],
        ['a', 2, []],
        ['a', 2, {}],
        ['b', 1, []],
        ['b', 1, {}],
        ['b', 2, []],
        ['b', 2, {}],
      ])
    })

    test('报错', async () => {
      const { cartesianProduct } = await import('./cartesianProduct.ts')

      expect(() =>
        // @ts-expect-error
        cartesianProduct(),
      ).toThrowError(/expects an array/)

      expect(() =>
        // @ts-expect-error
        cartesianProduct(1),
      ).toThrowError(/expects an array/)

      expect(() =>
        // @ts-expect-error
        cartesianProduct(null),
      ).toThrowError(/expects an array/)

      expect(() =>
        // @ts-expect-error
        cartesianProduct('js'),
      ).toThrowError(/expects an array/)

      expect(() =>
        // @ts-expect-error
        cartesianProduct(['dd', ['d']]),
      ).toThrowError(/index 0 must be an array/)

      expect(() =>
        // @ts-expect-error
        cartesianProduct([['dd'], ['d'], {}]),
      ).toThrowError(/index 2 must be an array/)
    })
  })

  describe('universal', () => {
    beforeAll(() => {
      jest.resetModules()
      // @ts-expect-error
      global.Function = class Function2 extends _Function {
        constructor(...args: any[]) {
          if (args[0] === 'return 1') {
            throw new Error()
          }
          super(...args)
        }
      }
    })

    test('正常', async () => {
      const { cartesianProduct } = await import('./cartesianProduct.ts')

      expect(cartesianProduct([])).toEqual([])

      expect(cartesianProduct([[], []])).toEqual([])

      expect(cartesianProduct([['a']])).toEqual([['a']])

      expect(cartesianProduct([['a', 'b']])).toEqual([['a'], ['b']])

      expect(
        cartesianProduct([
          ['a', 'b'],
          [1, 2],
        ]),
      ).toEqual([
        ['a', 1],
        ['a', 2],
        ['b', 1],
        ['b', 2],
      ])

      // adding a 0 element set causes the entire product to be empty.
      expect(cartesianProduct([['a', 'b'], [1, 2], []])).toEqual([])

      expect(
        cartesianProduct([
          [1, 2],
          ['a', 'b', 'c'],
        ]),
      ).toEqual([
        [1, 'a'],
        [1, 'b'],
        [1, 'c'],
        [2, 'a'],
        [2, 'b'],
        [2, 'c'],
      ])

      expect(
        cartesianProduct([
          ['a', 'b'],
          [1, 2],
          [[], {}],
        ]),
      ).toEqual([
        ['a', 1, []],
        ['a', 1, {}],
        ['a', 2, []],
        ['a', 2, {}],
        ['b', 1, []],
        ['b', 1, {}],
        ['b', 2, []],
        ['b', 2, {}],
      ])
    })

    test('报错', async () => {
      const { cartesianProduct } = await import('./cartesianProduct.ts')

      expect(() =>
        // @ts-expect-error
        cartesianProduct(),
      ).toThrowError(/expects an array/)

      expect(() =>
        // @ts-expect-error
        cartesianProduct(1),
      ).toThrowError(/expects an array/)

      expect(() =>
        // @ts-expect-error
        cartesianProduct(null),
      ).toThrowError(/expects an array/)

      expect(() =>
        // @ts-expect-error
        cartesianProduct('js'),
      ).toThrowError(/expects an array/)

      expect(() =>
        // @ts-expect-error
        cartesianProduct(['dd', ['d']]),
      ).toThrowError(/index 0 must be an array/)

      expect(() =>
        // @ts-expect-error
        cartesianProduct([['dd'], ['d'], {}]),
      ).toThrowError(/index 2 must be an array/)
    })
  })
})
