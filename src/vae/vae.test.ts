import * as v from './vae'

describe('vae', () => {
  test('ok', () => {
    // console.log(v.number().required().safeParse(1))
    const schema = v.object({
      id: v.number(),
      name: v.string().min(4).startsWith('00'),
      info: v.object({
        gender: v.string(),
      }),
      images: v.array(v.string().min(2)),
    })
    const res = schema.safeParse({
      id: 'oo',
      name: 'dd3',
      images: `['22', ';']`,
    })
    if (res.success) {
      console.log(res.data)
    } else {
      console.log(res.error.issues)
    }
    expect(1).toBe(1)
  })
})
