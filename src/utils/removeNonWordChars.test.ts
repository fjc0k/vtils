import { removeNonWordChars } from './removeNonWordChars'

describe('removeNonWordChars', () => {
  test('ok', () => {
    expect(removeNonWordChars('我==  \r\n龍@@#￥。。，x😌_(:з」∠)_k.0.')).toBe(
      '我龍xk0',
    )
  })
})
