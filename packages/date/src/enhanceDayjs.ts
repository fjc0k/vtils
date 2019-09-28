import dayjs from 'dayjs'

// === 默认语言设为中文 ===
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

// === 安装一些插件 ===
import __isLeapYearPlugin from 'dayjs/plugin/isLeapYear'
import __isSameOrAfterPlugin from 'dayjs/plugin/isSameOrAfter'
import __isSameOrBeforePlugin from 'dayjs/plugin/isSameOrBefore'
import __minMaxPlugin from 'dayjs/plugin/minMax'
import __relativeTimePlugin from 'dayjs/plugin/relativeTime'
import __toArrayPlugin from 'dayjs/plugin/toArray'
import __toObjectPlugin from 'dayjs/plugin/toObject'

const plugins = [
  __isLeapYearPlugin,
  __isSameOrAfterPlugin,
  __isSameOrBeforePlugin,
  __minMaxPlugin,
  __relativeTimePlugin,
  __toArrayPlugin,
  __toObjectPlugin,
]

for (const plugin of plugins) {
  dayjs.extend(plugin)
}

// === 导出 ===
export {
  dayjs,
  __isLeapYearPlugin,
  __isSameOrAfterPlugin,
  __isSameOrBeforePlugin,
  __minMaxPlugin,
  __relativeTimePlugin,
  __toArrayPlugin,
  __toObjectPlugin,
}
