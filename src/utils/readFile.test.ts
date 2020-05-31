import { base64Encode } from './base64'
import { readFile } from './readFile'
import { TextDecoder, TextEncoder } from 'util'

describe(readFile.name, () => {
  test('text should work', async () => {
    const expectedText = 'vtils'
    const actualText = await readFile(new File([expectedText], 'x')).text()
    expect(actualText).toBe(expectedText)
  })

  test('json should work', async () => {
    const expectedJson = { a: 1 }
    const actualJson = await readFile(
      new File([JSON.stringify(expectedJson)], 'x'),
    ).json<typeof expectedJson>()
    expect(actualJson).toEqual(expectedJson)
  })

  test('dataUrl should work', async () => {
    const expectedType = 'text/plain'
    const expectedData = 'hello'
    const expectedDataUrl = `data:${expectedType};base64,${base64Encode(
      expectedData,
    )}`
    const actualDataUrl = await readFile(
      new File([expectedData], 'x', { type: expectedType }),
    ).dataUrl()
    expect(actualDataUrl).toBe(expectedDataUrl)
  })

  test('base64 should work', async () => {
    const expectedData = 'hello'
    const expectedBase64 = base64Encode(expectedData)
    const actualBase64 = await readFile(new File([expectedData], 'x')).base64()
    expect(actualBase64).toBe(expectedBase64)
  })

  test('arrayBuffer should work', async () => {
    const expectedData = 'hello'
    const expectedArrayBuffer = new TextEncoder().encode(expectedData)
    const actualArrayBuffer = await readFile(
      new File([expectedArrayBuffer], 'x'),
    ).arrayBuffer()
    expect(new TextDecoder('utf-8').decode(actualArrayBuffer)).toBe(
      expectedData,
    )
  })
})
