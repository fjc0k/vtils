import { createSubmit } from '../utils'
import { hideLoading, showLoading, showToast } from '@tarojs/taro'

export const submit = createSubmit({
  start(message) {
    showLoading({
      title: message,
      mask: true,
    })
  },
  fail(message, duration) {
    hideLoading()
    showToast({
      title: message,
      icon: 'none',
      duration: duration,
    })
  },
  success(message, duration) {
    hideLoading()
    showToast({
      title: message,
      icon: 'success',
      duration: duration,
    })
  },
  complete() {
    hideLoading()
  },
})
