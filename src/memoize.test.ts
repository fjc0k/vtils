import {memoize} from './memoize'

const fn = jest.fn(() => 'ok')
const memoizedFn = memoize(fn)

test('调用原函数成功', () => {
  expect(memoizedFn()).toBe('ok')
  expect(fn).toBeCalledTimes(1)
})

test('以同样的参数调用原函数将直接返回缓存的值', () => {
  expect(memoizedFn()).toBe('ok')
  expect(fn).toBeCalledTimes(1)
})

test('可以修改缓存', () => {
  memoizedFn.cache.set(memoizedFn.lastCacheKey, 'hello')
  expect(memoizedFn()).toBe('hello')
  expect(fn).toBeCalledTimes(1)
})

test('可以获取缓存', () => {
  expect(memoizedFn.cache.get(memoizedFn.lastCacheKey)).toBe('hello')
})

test('可以删除缓存', () => {
  memoizedFn.cache.delete(memoizedFn.lastCacheKey)
  expect(memoizedFn()).toBe('ok')
  expect(fn).toBeCalledTimes(2)
})

test('可以清空缓存', () => {
  expect(memoizedFn()).toBe('ok')
  expect(fn).toBeCalledTimes(2)
  memoizedFn.cache.clear()
  expect(memoizedFn()).toBe('ok')
  expect(fn).toBeCalledTimes(3)
})

test('环境不支持 Map 时依然可用', () => {
  (window as any).Map = null
  const fn = jest.fn(() => 'ok')
  const memoizedFn = memoize(fn)
  expect(memoizedFn()).toBe('ok')
  expect(fn).toBeCalledTimes(1)
  expect(memoizedFn()).toBe('ok')
  expect(fn).toBeCalledTimes(1)
  memoizedFn.cache.set(memoizedFn.lastCacheKey, 'hello')
  expect(memoizedFn()).toBe('hello')
  expect(fn).toBeCalledTimes(1)
  expect(memoizedFn.cache.get(memoizedFn.lastCacheKey)).toBe('hello')
  memoizedFn.cache.delete(memoizedFn.lastCacheKey)
  expect(memoizedFn()).toBe('ok')
  expect(fn).toBeCalledTimes(2)
  expect(memoizedFn()).toBe('ok')
  expect(fn).toBeCalledTimes(2)
  memoizedFn.cache.clear()
  expect(memoizedFn()).toBe('ok')
  expect(fn).toBeCalledTimes(3)
})
