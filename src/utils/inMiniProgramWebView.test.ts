import { inMiniProgramWebView } from './inMiniProgramWebView'

const orignalUserAgent = window.navigator.userAgent
Object.defineProperty(window.navigator, 'userAgent', {
  value: orignalUserAgent,
  writable: true,
})

describe('inMiniProgramWebView', () => {
  test('非小程序 WebView 环境', () => {
    expect(inMiniProgramWebView()).toBe(false)
  })

  test('微信', () => {
    ;(window as any).__wxjs_environment = 'miniprogram'
    expect(inMiniProgramWebView()).toBe(true)
    delete (window as any).__wxjs_environment

    expect(inMiniProgramWebView()).toBe(false)

    // @ts-ignore
    window.navigator.userAgent = 'miniProgram'
    expect(inMiniProgramWebView()).toBe(true)
    // @ts-ignore
    window.navigator.userAgent = orignalUserAgent
  })

  test('QQ', () => {
    ;(window as any).__qqjs_environment = 'miniprogram'
    expect(inMiniProgramWebView()).toBe(true)
    delete (window as any).__qqjs_environment

    expect(inMiniProgramWebView()).toBe(false)
  })

  test('抖音', () => {
    // @ts-ignore
    window.navigator.userAgent = 'toutiaomicroapp'
    expect(inMiniProgramWebView()).toBe(true)
    // @ts-ignore
    window.navigator.userAgent = orignalUserAgent

    expect(inMiniProgramWebView()).toBe(false)
  })

  test('百度', () => {
    // @ts-ignore
    window.navigator.userAgent = 'swan'
    expect(inMiniProgramWebView()).toBe(true)
    // @ts-ignore
    window.navigator.userAgent = orignalUserAgent

    expect(inMiniProgramWebView()).toBe(false)
  })
})
