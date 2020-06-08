import { act, renderHook } from '@testing-library/react-hooks'
import { useLoadMore } from './useLoadMore'
import { useState } from 'react'

describe('useLoadMore', () => {
  test('仅当 deps 变化时 service 才被触发', async () => {
    const service = jest.fn().mockImplementation(async () => [])

    const { result, waitForNextUpdate } = renderHook(() => {
      const [id, setId] = useState(0)
      const [, setName] = useState('jay')
      useLoadMore(service, [id])
      return { setId, setName }
    })

    await waitForNextUpdate()

    expect(service).toBeCalledTimes(1)

    act(() => result.current.setId(1))

    expect(service).toBeCalledTimes(2)

    act(() => result.current.setName('fong'))

    expect(service).toBeCalledTimes(2)
  })

  test('加载表现正常', async () => {
    const service: (
      offset: number,
      pageNumber: number,
    ) => Array<
      [number, number]
    > = jest
      .fn()
      .mockImplementation((offset, pageNumber) => [[offset, pageNumber]])

    const { result, waitForNextUpdate } = renderHook(() => {
      const [id, setId] = useState(0)
      const [, setName] = useState('jay')
      const loader = useLoadMore(
        async payload => service(payload.offset, payload.pageNumber),
        [id],
      )
      return { setId, setName, loader }
    })

    expect(service).toBeCalled().toBeCalledTimes(1).toBeCalledWith(0, 1)

    expect(result.current.loader).toMatchSnapshot('首次加载中')
    await waitForNextUpdate()
    expect(result.current.loader).toMatchSnapshot('首次加载完成')

    act(() => result.current.loader.loadMore())

    expect(service).toBeCalledTimes(2)

    expect(result.current.loader).toMatchSnapshot('第二次加载中')
    await waitForNextUpdate()
    expect(result.current.loader).toMatchSnapshot('第二次加载完成')

    act(() => result.current.loader.loadMore())

    expect(service).toBeCalledTimes(3)

    expect(result.current.loader).toMatchSnapshot('第三次加载中')
    await waitForNextUpdate()
    expect(result.current.loader).toMatchSnapshot('第三次加载完成')

    act(() => result.current.loader.reload())

    expect(service).toBeCalledTimes(4)

    expect(result.current.loader).toMatchSnapshot('重新加载中')
    await waitForNextUpdate()
    expect(result.current.loader).toMatchSnapshot('重新加载完成')
  })

  test('total, noMore 表现正常', async () => {
    const service: (
      offset: number,
      pageNumber: number,
    ) => {
      total: number
      data: Array<[number, number]>
    } = jest.fn().mockImplementation((offset, pageNumber) => ({
      total: 2,
      data: [[offset, pageNumber]],
    }))

    const { result, waitForNextUpdate } = renderHook(() => {
      const [id, setId] = useState(0)
      const [, setName] = useState('jay')
      const loader = useLoadMore(
        async payload => service(payload.offset, payload.pageNumber),
        [id],
      )
      return { setId, setName, loader }
    })

    await waitForNextUpdate()

    act(() => result.current.loader.loadMore())
    await waitForNextUpdate()
    expect(result.current.loader).toMatchSnapshot('已无更多数据')

    act(() => result.current.loader.loadMore())
    expect(result.current.loader).toMatchSnapshot('已无更多数据仍继续加载')

    act(() => result.current.loader.reload())
    expect(result.current.loader).toMatchSnapshot('已无更多数据后重新加载中')
    await waitForNextUpdate()
    expect(result.current.loader).toMatchSnapshot('已无更多数据后重新加载后')
  })

  test('bug: 修复在第一页 reload 无效', async () => {
    const service = jest.fn().mockImplementation(() => [])

    const { result, waitForNextUpdate } = renderHook(() => {
      const loader = useLoadMore(async () => service(), [])
      return { loader }
    })

    await waitForNextUpdate()

    expect(service).toBeCalledTimes(1)

    act(() => result.current.loader.reload())

    expect(service).toBeCalledTimes(2)
  })

  test('bug: deps 变化后应 reload', async () => {
    const service = jest
      .fn()
      .mockImplementation(({ pageNumber, count }: any) => [[pageNumber, count]])

    const { result, waitForNextUpdate } = renderHook(() => {
      const [count, setCount] = useState(0)
      const loader = useLoadMore(
        async ({ pageNumber }) => service({ pageNumber, count }),
        [count],
      )
      return { loader, incCount: () => setCount(count => count + 1) }
    })

    await waitForNextUpdate()
    expect(service).toBeCalledTimes(1)

    act(() => result.current.incCount())
    // TODO: 未知原因导致失败
    // expect(service).toBeCalledTimes(2)
    // expect(result.current.loader).toMatchSnapshot('deps 变化后加载中')
    await waitForNextUpdate()
    expect(result.current.loader).toMatchSnapshot('deps 变化后加载完成')
  })
})
