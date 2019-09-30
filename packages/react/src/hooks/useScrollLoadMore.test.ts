import {renderHook} from '@testing-library/react-hooks'
import {useRef} from 'react'
import {useScrollLoadMore} from './useScrollLoadMore'
import {wait} from 'vtils'

// ref: https://github.com/karl-run/react-bottom-scroll-listener/blob/master/src/hook/index.test.tsx

/* Mock out scrollHeight so we can change it before dispatching scroll event */
Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
  configurable: true,
  get: function () {
    return this._scrollHeight || 0
  },
  set(val) {
    this._scrollHeight = val
  },
})

/* Mock out clientHeight so we can change it before dispatching scroll event in custom containers */
Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
  configurable: true,
  get: function () {
    return this._clientHeight || 0
  },
  set(val) {
    this._clientHeight = val
  },
})

test('未滚动，不触发 service', async () => {
  const service = jest.fn().mockImplementation(() => [1])

  renderHook(() => useScrollLoadMore(async () => service(), [], {
    debounce: 0,
    threshold: 0,
  }))

  await wait(100)

  // window size is 768.
  // 768 + 400 = 1168, should not scroll

  // @ts-ignore
  document.documentElement.scrollHeight = 1200
  document.documentElement.scrollTop = 400

  window.dispatchEvent(new Event('scroll'))

  await wait(100)

  expect(service).toHaveBeenCalledTimes(1)
})

test('滚动，触发 service', async () => {
  const service = jest.fn().mockImplementation(() => [1])

  renderHook(() => useScrollLoadMore(async () => service(), [], {
    debounce: 0,
    threshold: 0,
  }))

  await wait(100)

  // window size is 768.
  // 768 + 432 = 1200, should scroll

  // @ts-ignore
  document.documentElement.scrollHeight = 1200
  document.documentElement.scrollTop = 432

  window.dispatchEvent(new Event('scroll'))

  await wait(100)

  expect(service).toHaveBeenCalledTimes(2)
})

test('自定义容器表现正常', async () => {
  const service = jest.fn().mockImplementation(() => [1])

  const container = document.createElement('div')
  let triggerScroll!: () => void
  // @ts-ignore
  container.clientHeight = 600
  container.addEventListener = (_: any, cb: any) => {triggerScroll = cb}

  renderHook(() => {
    const containerRef = useRef(container)
    useScrollLoadMore(async () => service(), [], {
      debounce: 0,
      threshold: 0,
      containerRef: containerRef,
    })
  })

  await wait(100)

  // container size is 600.
  // 600 + 300 = 900, should not scroll

  // @ts-ignore
  container.scrollHeight = 1000
  container.scrollTop = 300

  triggerScroll()

  await wait(100)

  expect(service).toHaveBeenCalledTimes(1)

  await wait(100)

  // container size is 600.
  // 600 + 400 = 1000, should scroll

  // @ts-ignore
  container.scrollHeight = 1000
  container.scrollTop = 400

  triggerScroll()

  await wait(100)

  expect(service).toHaveBeenCalledTimes(2)
})
