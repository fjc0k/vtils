import {PackedStructuredList, StructuredList, StructuredListTransformer} from './StructuredListTransformer'

describe('StructuredListTransformer', () => {
  interface Item {
    id: number,
    name: string,
  }

  const structuredList: StructuredList<Item> = [
    {id: 1, name: 'Jay'},
    {id: 2, name: 'Jay2'},
    {id: 3, name: 'Jay3'},
    {id: 4, name: 'Jay4'},
  ]
  const packedStructuredList: PackedStructuredList<Item> = new StructuredListTransformer(structuredList).pack()
  const unpackedStructuredList: StructuredList<Item> = new StructuredListTransformer(packedStructuredList).unpack()

  test('基础表现正常', () => {
    expect(unpackedStructuredList).toEqual(structuredList)
    expect(StructuredListTransformer.transformIfNeeded(packedStructuredList)).toEqual(structuredList)
    expect(StructuredListTransformer.transformIfNeeded([packedStructuredList])).toEqual([packedStructuredList])
    expect(StructuredListTransformer.transformIfNeeded(1)).toEqual(1)
    expect(StructuredListTransformer.transformIfNeeded([])).toEqual([])
  })

  test('支持递归', () => {
    expect(
      StructuredListTransformer.transformIfNeeded({
        list: packedStructuredList,
      }),
    ).toEqual({list: structuredList})
    expect(
      StructuredListTransformer.transformIfNeeded({list: {list: packedStructuredList}}),
    ).toEqual({list: {list: structuredList}})
    expect(
      StructuredListTransformer.transformIfNeeded({list: {list: {list: packedStructuredList}}}),
    ).toEqual({list: {list: {list: packedStructuredList}}})
    expect(
      StructuredListTransformer.transformIfNeeded({list: {list: {list: packedStructuredList}}}, 3),
    ).toEqual({list: {list: {list: structuredList}}})
  })
})
