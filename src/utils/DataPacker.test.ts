import { DataPacker } from './DataPacker.ts'

describe('DataPacker', () => {
  const rawData = [
    { id: 1, name: 'Jay' },
    { id: 2, name: 'Jay2' },
    { id: 3, name: 'Jay3' },
    { id: 4, name: 'Jay4' },
  ]
  const packedData = DataPacker.pack(rawData)
  const unpackedData = DataPacker.unpack(packedData)

  test('基础表现正常', () => {
    expect(unpackedData).toEqual(rawData)
    expect(DataPacker.unpackIfNeeded(packedData)).toEqual(rawData)
    expect(DataPacker.unpackIfNeeded([packedData])).toEqual([packedData])
    expect(DataPacker.unpackIfNeeded(1)).toEqual(1)
    expect(DataPacker.unpackIfNeeded([])).toEqual([])
  })

  test('支持递归', () => {
    expect(
      DataPacker.unpackIfNeeded({
        list: packedData,
      }),
    ).toEqual({ list: rawData })
    expect(DataPacker.unpackIfNeeded({ list: { list: packedData } })).toEqual({
      list: { list: rawData },
    })
    expect(
      DataPacker.unpackIfNeeded({
        list: { list: { list: packedData } },
      }),
    ).toEqual({ list: { list: { list: packedData } } })
    expect(
      DataPacker.unpackIfNeeded({ list: { list: { list: packedData } } }, 3),
    ).toEqual({ list: { list: { list: rawData } } })
  })

  test('bug: 空数据正常', () => {
    expect(DataPacker.unpack(DataPacker.pack([]))).toEqual([])
  })

  test('支持对象', () => {
    expect(
      DataPacker.unpack(
        DataPacker.pack({
          x: 1,
          y: {
            z: 'hello',
          },
        }),
      ),
    ).toEqual({
      x: 1,
      y: {
        z: 'hello',
      },
    })
  })

  test('兼容 v2 的 StructuredListTransformer 产生的数据', () => {
    const data = {
      __IS_PACKED_STRUCTURED_LIST__: true,
      keys: ['id', 'name'],
      values: [
        ['1111', 1],
        ['2222', 2],
      ],
      signature: 'ZGLmZmL2ZQZmAQx3Av4kYwN',
    }
    expect(DataPacker.unpackIfNeeded(data as any)).toEqual([
      {
        id: 1,
        name: '1111',
      },
      {
        id: 2,
        name: '2222',
      },
    ])
  })
})
