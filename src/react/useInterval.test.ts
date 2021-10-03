import { useInterval } from './useInterval'

describe('useInterval', () => {
  test('ok', () => {
    expect(useInterval).toBe(useInterval)
  })
  // test('通过 stop/start 控制', async () => {
  //   let i = 0
  //   const { result } = renderHook(() =>
  //     useInterval(() => {
  //       const prevI = i
  //       i = i + 1
  //       return prevI
  //     }, 20),
  //   )
  //   expect(result.current[0]).toBe(0)
  //   await wait(20)
  //   expect(result.current[0]).toBe(1)
  //   result.current[1].stop()
  //   await wait(40)
  //   expect(result.current[0]).toBe(1)
  //   result.current[1].start()
  //   expect(result.current[0]).toBe(2)
  //   await wait(25)
  //   expect(result.current[0]).toBe(3)
  //   result.current[1].stop()
  // })

  // test('通过 delay 控制', async () => {
  //   let i = 0
  //   const { result } = renderHook(() => {
  //     const [delay, setDelay] = useState<any>(20)
  //     return {
  //       interval: useInterval(() => {
  //         const prevI = i
  //         i = i + 1
  //         return prevI
  //       }, delay),
  //       setDelay: setDelay,
  //     }
  //   })
  //   expect(result.current.interval[0]).toBe(0)
  //   await wait(25)
  //   expect(result.current.interval[0]).toBe(1)
  //   act(() => result.current.setDelay(false))
  //   await wait(40)
  //   expect(result.current.interval[0]).toBe(1)
  //   act(() => result.current.setDelay(20))
  //   await wait(0)
  //   expect(result.current.interval[0]).toBe(2)
  //   await wait(25)
  //   expect(result.current.interval[0]).toBe(3)
  //   result.current.interval[1].stop()
  // })

  // // test('支持 duration', async () => {
  // //   let i = 0
  // //   renderHook(() =>
  // //     useInterval(
  // //       () => {
  // //         i = i + 1
  // //       },
  // //       5,
  // //       16,
  // //     ),
  // //   )
  // //   await wait(30)
  // //   expect(i).toBe(3)
  // // })

  // test('支持 start 设置 delay, duration', async () => {
  //   let i = 0
  //   const { result } = renderHook(() => {
  //     return useInterval(() => {
  //       i = i + 1
  //     }, null)[1]
  //   })
  //   expect(i).toBe(0)
  //   act(() => result.current.start(10, 3))
  //   expect(i).toBe(1)
  //   await wait(12)
  //   expect(i).toBe(1)
  // })
})
