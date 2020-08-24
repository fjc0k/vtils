import { createSubmit } from '../utils'
import { ensureInMiniProgram } from './ensureInMiniProgram'

export const submit = createSubmit({
  start(message) {
    ensureInMiniProgram(mp => {
      mp.showLoading({
        title: message,
        mask: true,
      })
    })
  },
  fail(message, duration) {
    ensureInMiniProgram(mp => {
      mp.hideLoading()
      mp.showToast({
        title: message,
        icon: 'none',
        duration: duration,
      })
    })
  },
  success(message, duration) {
    ensureInMiniProgram(mp => {
      mp.hideLoading()
      mp.showToast({
        title: message,
        icon: 'success',
        duration: duration,
      })
    })
  },
  complete() {
    ensureInMiniProgram(mp => {
      mp.hideLoading()
    })
  },
})
