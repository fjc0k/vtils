import * as v from './vae'

describe('vae', () => {
  test('ok', () => {
    // console.log(v.number().required().safeParse(1))
    const res = v
      .object({
        id: v.number(),
        name: v.string().min(4),
        info: v.object({
          gender: v.string(),
        }),
      })
      .safeParse({
        id: 1,
        name: 'dd433',
      })
    if (res.success) {
      console.log(res.data)
    } else {
      console.log(res.error.issues)
    }
    expect(1).toBe(1)
  })
})
