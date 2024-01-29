import { zhCN } from './locale/zhCN.ts'
import * as yup from './yupSource/index.js'

// 设置中文为默认语言
yup.setLocale(zhCN)

export { yup }
