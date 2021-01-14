import { ListWrapper, RawList, WrappedList } from './ListWrapper'

describe('ListWrapper', () => {
  interface Item {
    id: number
    name: string
  }

  const rawList: RawList<Item> = [
    { id: 1, name: 'Jay' },
    { id: 2, name: 'Jay2' },
    { id: 3, name: 'Jay3' },
    { id: 4, name: 'Jay4' },
  ]
  const wrappedList: WrappedList<Item> = new ListWrapper(rawList).wrap()
  const unwrappedList: RawList<Item> = new ListWrapper(wrappedList).unwrap()

  test('基础表现正常', () => {
    expect(unwrappedList).toEqual(rawList)
    expect(ListWrapper.unwrapIfNeeded(wrappedList)).toEqual(rawList)
    expect(ListWrapper.unwrapIfNeeded([wrappedList])).toEqual([wrappedList])
    expect(ListWrapper.unwrapIfNeeded(1)).toEqual(1)
    expect(ListWrapper.unwrapIfNeeded([])).toEqual([])
  })

  test('支持递归', () => {
    expect(
      ListWrapper.unwrapIfNeeded({
        list: wrappedList,
      }),
    ).toEqual({ list: rawList })
    expect(
      ListWrapper.unwrapIfNeeded({ list: { list: wrappedList } }),
    ).toEqual({ list: { list: rawList } })
    expect(
      ListWrapper.unwrapIfNeeded({
        list: { list: { list: wrappedList } },
      }),
    ).toEqual({ list: { list: { list: wrappedList } } })
    expect(
      ListWrapper.unwrapIfNeeded({ list: { list: { list: wrappedList } } }, 3),
    ).toEqual({ list: { list: { list: rawList } } })
  })

  test('bug: 空数据正常', () => {
    expect(new ListWrapper(new ListWrapper([]).wrap()).unwrap()).toEqual([])
  })
})
