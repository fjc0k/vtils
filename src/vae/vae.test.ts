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
    expect(
      v
        .string()
        .default('hello')
        .required()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()
    expect(v.string().required().safeParse('')).toMatchSnapshot()
    expect(v.string().required().nonempty().safeParse('')).toMatchSnapshot()
    expect(v.string().required().safeParse('hello')).toMatchSnapshot()

    expect(v.string().required().min(6).safeParse('hello')).toMatchSnapshot()
    expect(v.string().required().max(2).safeParse('hello')).toMatchSnapshot()
    expect(v.string().required().length(3).safeParse('hello')).toMatchSnapshot()

    expect(v.string().required().email().safeParse('hello')).toMatchSnapshot()
    expect(
      v.string().required().email().safeParse('hello@gmail.com'),
    ).toMatchSnapshot()

    expect(
      v.string().required().url().safeParse('hello@gmail.com'),
    ).toMatchSnapshot()
    expect(
      v.string().required().url().safeParse('https://baidu.com'),
    ).toMatchSnapshot()

    expect(
      v.string().required().regex(/^\d+$/).safeParse('k2'),
    ).toMatchSnapshot()
    expect(
      v.string().required().regex(/^\d+$/).safeParse('234'),
    ).toMatchSnapshot()

    expect(
      v.string().required().includes('dd').safeParse('k2'),
    ).toMatchSnapshot()
    expect(
      v.string().required().includes('dd').safeParse('23dd4'),
    ).toMatchSnapshot()

    expect(
      v.string().required().startsWith('dd').safeParse('k2'),
    ).toMatchSnapshot()
    expect(
      v.string().required().startsWith('dd').safeParse('dd234'),
    ).toMatchSnapshot()

    expect(
      v.string().required().endsWith('dd').safeParse('k2'),
    ).toMatchSnapshot()
    expect(
      v.string().required().endsWith('dd').safeParse('234dd'),
    ).toMatchSnapshot()

    expect(
      v.string().required().phoneNumber().safeParse('k2'),
    ).toMatchSnapshot()
    expect(
      v.string().required().phoneNumber().safeParse('18080000000'),
    ).toMatchSnapshot()

    expect(
      v.string().required().idCardNumber().safeParse('k2'),
    ).toMatchSnapshot()
    expect(
      v.string().required().idCardNumber().safeParse('110101202305033210'),
    ).toMatchSnapshot()
  })

  test('number', () => {
    expect(
      v
        .number()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()
    expect(
      v.number().safeParse(
        // @ts-expect-error
        '',
      ),
    ).toMatchSnapshot()
    expect(
      v.number().safeParse(
        // @ts-expect-error
        '3',
      ),
    ).toMatchSnapshot()
    expect(v.number().safeParse(3)).toMatchSnapshot()

    expect(
      v
        .number()
        .required()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()
    expect(
      v
        .number()
        .default(3)
        .required()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()
    expect(
      v.number().required().safeParse(
        // @ts-expect-error
        '',
      ),
    ).toMatchSnapshot()
    expect(v.number().required().safeParse(3)).toMatchSnapshot()

    expect(v.number().required().min(6).safeParse(0)).toMatchSnapshot()
    expect(v.number().required().max(2).safeParse(0)).toMatchSnapshot()
    expect(v.number().required().lessThan(2).safeParse(0)).toMatchSnapshot()
    expect(v.number().required().moreThan(2).safeParse(0)).toMatchSnapshot()

    expect(v.number().required().integer().safeParse(0)).toMatchSnapshot()
    expect(v.number().required().integer().safeParse(-1)).toMatchSnapshot()
    expect(v.number().required().integer().safeParse(1.2)).toMatchSnapshot()
    expect(v.number().required().integer().safeParse(1)).toMatchSnapshot()

    expect(v.number().required().positive().safeParse(1)).toMatchSnapshot()
    expect(v.number().required().positive().safeParse(1.2)).toMatchSnapshot()
    expect(v.number().required().positive().safeParse(-1)).toMatchSnapshot()
    expect(v.number().required().positive().safeParse(0)).toMatchSnapshot()

    expect(v.number().required().nonpositive().safeParse(1)).toMatchSnapshot()
    expect(v.number().required().nonpositive().safeParse(1.2)).toMatchSnapshot()
    expect(v.number().required().nonpositive().safeParse(-1)).toMatchSnapshot()
    expect(v.number().required().nonpositive().safeParse(0)).toMatchSnapshot()

    expect(v.number().required().negative().safeParse(1)).toMatchSnapshot()
    expect(v.number().required().negative().safeParse(1.2)).toMatchSnapshot()
    expect(v.number().required().negative().safeParse(-1)).toMatchSnapshot()
    expect(v.number().required().negative().safeParse(0)).toMatchSnapshot()

    expect(v.number().required().nonnegative().safeParse(1)).toMatchSnapshot()
    expect(v.number().required().nonnegative().safeParse(1.2)).toMatchSnapshot()
    expect(v.number().required().nonnegative().safeParse(-1)).toMatchSnapshot()
    expect(v.number().required().nonnegative().safeParse(0)).toMatchSnapshot()

    expect(
      v.number().required().positiveInteger().safeParse(1),
    ).toMatchSnapshot()
    expect(
      v.number().required().positiveInteger().safeParse(1.2),
    ).toMatchSnapshot()
    expect(
      v.number().required().positiveInteger().safeParse(-1),
    ).toMatchSnapshot()
    expect(
      v.number().required().positiveInteger().safeParse(0),
    ).toMatchSnapshot()

    expect(v.number().required().id().safeParse(1)).toMatchSnapshot()
    expect(v.number().required().id().safeParse(1.2)).toMatchSnapshot()
    expect(v.number().required().id().safeParse(-1)).toMatchSnapshot()
    expect(v.number().required().id().safeParse(0)).toMatchSnapshot()
  })

  test('boolean', () => {
    expect(
      v
        .boolean()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()
    expect(
      v.boolean().safeParse(
        // @ts-expect-error
        '',
      ),
    ).toMatchSnapshot()
    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()

    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .safeParse(''),
    ).toMatchSnapshot()
    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .safeParse(0),
    ).toMatchSnapshot()
    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .safeParse(NaN),
    ).toMatchSnapshot()

    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .safeParse('2'),
    ).toMatchSnapshot()
    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .safeParse(1),
    ).toMatchSnapshot()
    expect(
      v
        .boolean()
        .required()
        // @ts-expect-error
        .safeParse(33.33),
    ).toMatchSnapshot()
  })

  test('date', () => {
    expect(
      v
        .date()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()
    expect(
      v.date().safeParse(
        // @ts-expect-error
        '',
      ),
    ).toMatchSnapshot()
    expect(
      v
        .date()
        .required()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()

    expect(
      v.date().required().safeParse(new Date('2023-07-14T03:23:28.926Z')),
    ).toMatchSnapshot()
    expect(
      v
        .date()
        .required()
        // @ts-expect-error
        .safeParse(new Date('2023-07-14T03:23:28.926Z').toISOString()),
    ).toMatchSnapshot()

    expect(
      v
        .date()
        .required()
        .min('2023-06-14T03:23:28.926Z')
        .safeParse(new Date('2023-07-14T03:23:28.926Z')),
    ).toMatchSnapshot()
    expect(
      v
        .date()
        .required()
        .min(new Date('2023-09-14T03:23:28.926Z'))
        .safeParse(new Date('2023-07-14T03:23:28.926Z')),
    ).toMatchSnapshot()

    expect(
      v
        .date()
        .required()
        .max('2023-06-14T03:23:28.926Z')
        .safeParse(new Date('2023-07-14T03:23:28.926Z')),
    ).toMatchSnapshot()
    expect(
      v
        .date()
        .required()
        .max(new Date('2023-09-14T03:23:28.926Z'))
        .safeParse(new Date('2023-07-14T03:23:28.926Z')),
    ).toMatchSnapshot()
  })

  test('enum', () => {
    expect(
      v
        .enum(['x', 'y'])
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()
    expect(v.enum(['x', 'y']).safeParse('')).toMatchSnapshot()
    expect(
      v
        .enum(['x', 'y'])
        .required()
        // @ts-expect-error
        .safeParse(),
    ).toMatchSnapshot()

    expect(v.enum(['x', 'y']).required().safeParse('x')).toMatchSnapshot()
    expect(v.enum(['x', 'y']).required().safeParse('y')).toMatchSnapshot()
    expect(v.enum(['x', 'y']).required().safeParse('z')).toMatchSnapshot()
    expect(v.enum(['x', 'y']).required().safeParse(2)).toMatchSnapshot()
    expect(v.enum(['x', 'y']).required().safeParse(true)).toMatchSnapshot()

    enum XY {
      x = 'x',
      y = 'y',
    }
    expect(v.enum(XY).required().safeParse('x')).toMatchSnapshot()
    expect(v.enum(XY).required().safeParse('y')).toMatchSnapshot()
    expect(v.enum(XY).required().safeParse('z')).toMatchSnapshot()
    expect(v.enum(XY).required().safeParse(2)).toMatchSnapshot()
    expect(v.enum(XY).required().safeParse(true)).toMatchSnapshot()

    const XY2 = {
      x: 'x',
      y: 'y',
    }
    expect(v.enum(XY2).required().safeParse('x')).toMatchSnapshot()
    expect(v.enum(XY2).required().safeParse('y')).toMatchSnapshot()
    expect(v.enum(XY2).required().safeParse('z')).toMatchSnapshot()
    expect(v.enum(XY2).required().safeParse(2)).toMatchSnapshot()
    expect(v.enum(XY2).required().safeParse(true)).toMatchSnapshot()
  })

  test('array', () => {
    expect(v.array(v.string().required()).safeParse([1, '2'])).toMatchSnapshot()
    expect(
      v.array(v.string().required()).min(3).safeParse([1, '2']),
    ).toMatchSnapshot()
    expect(
      v.array(v.string().required()).max(2).safeParse([1, '2']),
    ).toMatchSnapshot()
  })

  test('object', () => {
    const schema = v.object({
      id: v.number().required().id(),
      name: v.string().required().max(10),
      gender: v.enum(['male', 'female']).required(),
      images: v.array(v.string().required().nonempty()).default([]),
      isAdmin: v.boolean().default(false),
    })
    expect(schema.safeParse({ id: 1 })).toMatchSnapshot()
  })
})
