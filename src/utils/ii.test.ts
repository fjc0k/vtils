import { ii } from './ii.ts'

describe('ii', () => {
  test('表现正常', async () => {
    expect(ii(() => 1)).toBe(1)
    const n: number = await ii(() => Promise.resolve(1))
    expect(n).toBe(1)
  })
})
