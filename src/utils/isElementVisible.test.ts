import { isElementVisible } from './isElementVisible.ts'

describe('isElementVisible', () => {
  test('ok', () => {
    const el = document.createElement('div')
    expect(isElementVisible(el)).toBe(false)
    document.body.appendChild(el)
    expect(isElementVisible(el)).toBe(true)

    el.style.display = 'none'
    expect(isElementVisible(el)).toBe(false)
    el.style.display = 'block'
    expect(isElementVisible(el)).toBe(true)

    el.style.opacity = '0'
    expect(isElementVisible(el)).toBe(false)
    el.style.opacity = '0.1'
    expect(isElementVisible(el)).toBe(true)

    el.style.visibility = 'hidden'
    expect(isElementVisible(el)).toBe(false)
    el.style.visibility = 'visible'
    expect(isElementVisible(el)).toBe(true)

    const el2 = document.createElement('div')
    el.appendChild(el2)
    expect(isElementVisible(el2)).toBe(true)
  })
})
