import { v } from './vae'

describe('vae', () => {
  test('string', () => {
    expect(
      v
        .string()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()
    expect(v.string().safeParse('')).toMatchSnapshot()
    expect(v.string().safeParse('hello')).toMatchSnapshot()

    expect(
      v
        .string()
        .required()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()
    expect(v.string().required().safeParse('')).toMatchSnapshot()
    expect(v.string().required().safeParse('hello')).toMatchSnapshot()
  })

  // test('ok', () => {
  //   // console.log(v.number().required().safeParse(1))
  //   const schema = v.object({
  //     id: v.number(),
  //     name: v.string().min(4).startsWith('00'),
  //     info: v.object({
  //       gender: v.string(),
  //     }),
  //     images: v.array(v.string().min(2)).min(2),
  //   })
  //   const res = schema.safeParse({
  //     id: '1',
  //     name: '00dd344',
  //     images: ['22', ';9999'],
  //   })
  //   if (res.success) {
  //     console.log(res.data)
  //   } else {
  //     console.log(res.error.issues)
  //   }
  //   expect(1).toBe(1)
  // })
})
