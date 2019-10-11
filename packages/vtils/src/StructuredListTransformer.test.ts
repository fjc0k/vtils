import {PackedStructuredList, StructuredList, StructuredListTransformer} from './StructuredListTransformer'

test('表现正常', () => {
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

  expect(packedStructuredList).toMatchSnapshot('packedStructuredList')
  expect(unpackedStructuredList).toEqual(structuredList)
  expect(StructuredListTransformer.transformIfNeeded(packedStructuredList)).toEqual(structuredList)
  expect(StructuredListTransformer.transformIfNeeded(1)).toEqual(1)
  expect(StructuredListTransformer.transformIfNeeded([])).toEqual([])
})
