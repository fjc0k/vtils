import { inBrowser } from './inBrowser'
import { onResize } from './onResize'

export interface FlexibleOptions {
  /**
   * 获取浏览器视图宽度。
   *
   * @default () => document.documentElement.clientWidth
   */
  getViewWidth?: () => number,
}

/**
 * 移动端屏幕适配。
 *
 * @param options 选项
 */
export function flexible(options: FlexibleOptions = {}): void {
  inBrowser(() => {
    const docEl = document.documentElement
    const dpr = window.devicePixelRatio || 1

    const setMeta = (): void => {
      let viewport = document.querySelector<HTMLMetaElement>('meta[name="viewport"]')
      if (!viewport) {
        viewport = document.createElement('meta')
        viewport.name = 'viewport'
        document.head && document.head.appendChild(viewport)
      }
      viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover'
    }

    const setBodyFontSize = (): void => {
      if (document.body) {
        document.body.style.fontSize = `${12 * dpr}px`
      } else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
      }
    }

    const setRemUnit = (): void => {
      const rem = (options.getViewWidth ? options.getViewWidth() : docEl.clientWidth) / 10
      docEl.style.fontSize = `${rem}px`
    }

    setMeta()
    setBodyFontSize()
    setRemUnit()
    onResize(setRemUnit)
    window.addEventListener('pageshow', e => {
      if (e.persisted) {
        setRemUnit()
      }
    })
  })
}
