import { chooseFile } from './chooseFile'

describe('chooseFile', () => {
  // @ts-ignore
  HTMLInputElement.prototype.addEventListener = function (
    _: any,
    cb: () => any,
  ) {
    Object.defineProperty(this, 'files', {
      value: {
        0: new File([], `${this.accept}__${this.multiple}.txt`),
        length: 1,
        item: () => new File([], '1'),
      },
      writable: true,
      configurable: true,
      enumerable: true,
    })
    setTimeout(cb, 0)
  }

  test('选择图片', async () => {
    const files = await chooseFile('image')
    expect(files[0].name).toMatchSnapshot()
  })

  test('多选图片', async () => {
    const files = await chooseFile('image', true)
    expect(files[0].name).toMatchSnapshot()
  })

  test('选择其他', async () => {
    const files = await chooseFile('.doc,.docx')
    expect(files[0].name).toMatchSnapshot()
  })

  test('多选其他', async () => {
    const files = await chooseFile('.doc,.docx', true)
    expect(files[0].name).toMatchSnapshot()
  })
})
