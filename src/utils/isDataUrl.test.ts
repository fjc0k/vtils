import { isDataUrl } from './isDataUrl.ts'

describe('isDataUrl', () => {
  test('是', () => {
    const valid = [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC',
      'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%2300B1FF%22%20width%3D%22100%22%20height%3D%22100%22%2F%3E%3C%2Fsvg%3E',
      'data:image/svg+xml;charset=utf-8;name=bar.svg,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%3Crect%20fill%3D%22%2300B1FF%22%20width%3D%22100%22%20height%3D%22100%22%2F%3E%3C%2Fsvg%3E',
      'data:image/png;name=foo.png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIBAMAAAA2IaO4AAAAFVBMVEXk5OTn5+ft7e319fX29vb5+fn///++GUmVAAAALUlEQVQIHWNICnYLZnALTgpmMGYIFWYIZTA2ZFAzTTFlSDFVMwVyQhmAwsYMAKDaBy0axX/iAAAAAElFTkSuQmCC',
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCBmaWxsPSIjMDBCMUZGIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPjwvc3ZnPg==',
      'data:,Hello%2C%20World!',
      'data:,Hello World!',
      'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
      'data:text/html,%3Ch1%3EHello%2C%20World!%3C%2Fh1%3E',
      'data:,A%20brief%20note',
      'data:text/html;charset=US-ASCII,%3Ch1%3EHello!%3C%2Fh1%3E',
      'data:audio/mp3;base64,%3Ch1%3EHello!%3C%2Fh1%3E',
      'data:video/x-ms-wmv;base64,%3Ch1%3EHello!%3C%2Fh1%3E',
      'data:application/vnd.ms-excel;base64,PGh0bWw%2BPC9odG1sPg%3D%3D',
      'data:image/svg+xml;name=foobar%20(1).svg;charset=UTF-8,some-data',
    ]
    for (const item of valid) {
      expect(isDataUrl(item)).toBeTrue()
    }
  })

  test('否', () => {
    const invalid = [
      'dataxbase64',
      'data:HelloWorld',
      'data:text/html;charset=,%3Ch1%3EHello!%3C%2Fh1%3E',
      'data:text/plain;name=@;base64,SGVsbG8sIFdvcmxkIQ%3D%3D',
      'data:text/html;charset,%3Ch1%3EHello!%3C%2Fh1%3E',
      'data:base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
      '',
      'http://wikipedia.org',
      'base64',
      'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
    ]
    for (const item of invalid) {
      expect(isDataUrl(item)).toBeFalse()
    }
  })
})
