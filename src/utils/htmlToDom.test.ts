import { htmlToDocumentFragment, htmlToElement } from './htmlToDom'

describe('htmlToDom', () => {
  test('htmlToDocumentFragment 正常', () => {
    expect(
      // @ts-expect-error
      htmlToDocumentFragment(),
    ).toMatchSnapshot()
    expect(htmlToDocumentFragment('test')).toMatchSnapshot()
    expect(htmlToDocumentFragment('test <a>hello</a>')).toMatchSnapshot()
    expect(htmlToDocumentFragment('<a>hello</a>')).toMatchSnapshot()
    expect(
      htmlToDocumentFragment('<a>hello</a>')
        .querySelector('a')
        ?.textContent?.trim(),
    ).toMatchSnapshot()
  })

  test('htmlToElement 正常', () => {
    expect(htmlToElement('test')).toMatchSnapshot()
    expect(htmlToElement('test <a>hello</a>')).toMatchSnapshot()
    expect(htmlToElement('<a>hello</a>')).toMatchSnapshot()
  })
})
