import * as v from './vae'

describe('vae', () => {
  test('ok', () => {
    v.object({
      id: v.number().required(),
    })
    // ...
  })
})
