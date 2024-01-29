import { nanoid } from './nanoid.ts'

describe('nanoid', () => {
  test('默认长度是21', () => {
    expect(nanoid().length).toBe(21)
  })

  test('可自定义长度', () => {
    expect(nanoid(10).length).toBe(10)
    expect(nanoid(5).length).toBe(5)
  })
})
