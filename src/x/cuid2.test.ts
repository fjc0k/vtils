/**
 * @jest-environment node
 */
import { cuid2 } from './cuid2.ts'

describe('cuid2', () => {
  test('ok', () => {
    expect(cuid2().length).toBe(24)
    expect(cuid2(10).length).toBe(10)
    expect(cuid2(5).length).toBe(5)
    expect(cuid2(30).length).toBe(30)
  })
})
