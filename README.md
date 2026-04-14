# vtils ![Test](https://github.com/fjc0k/vtils/workflows/Test/badge.svg?branch=master) <a href="https://fjc0k.github.io/vtils/v4-coverage/">![Coverage](https://codecov.io/gh/fjc0k/vtils/branch/master/graph/badge.svg)</a>

一个面向业务的 JavaScript/TypeScript 实用程序库。

> 文档：[https://fjc0k.github.io/vtils/v4/](https://fjc0k.github.io/vtils/v4/)
>
> 测试报告：[https://fjc0k.github.io/vtils/v4-coverage/](https://fjc0k.github.io/vtils/v4-coverage/)

```ts
import { md5 } from 'vtils'

console.log(md5('龙'))
// => 682570a229cbd3d67e76ad99b3152060
```

---

<!-- TOC depthFrom:2 -->

- [特性](#特性)
- [安装](#安装)
- [使用](#使用)
  - [在 NodeJS 中使用](#在-nodejs-中使用)
  - [在 Taro 3 中使用](#在-taro-3-中使用)
  - [在 Deno 中使用](#在-deno-中使用)
  - [自定义打包](#自定义打包)
- [许可](#许可)

<!-- /TOC -->

## 特性

- **🙅‍♀️ 拒绝重复**：基于社区优质程序库（[Lodash](https://lodash.com/)、[date-fns](https://date-fns.org/)、[react-use](https://github.com/streamich/react-use#readme)、[type-fest](https://github.com/sindresorhus/type-fest#readme)、[ts-essentials](https://github.com/krzkaczor/ts-essentials#readme)、[yup](https://github.com/jquense/yup) 等），补充常用业务代码。

- **🌸 精致优雅**：为每一个工具都添加了注释、测试，不看文档亦可直接使用。

- **🌈 面向未来**：使用 [TypeScript](https://www.typescriptlang.org/) 编写，支持 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)、[ECMAScript Modules](https://nodejs.org/api/esm.html)，也可以在 [Taro 3](https://taro.js.org/)、 [Deno](https://deno.land/) 中使用。

## 安装

```bash
# npm
npm i vtils

# yarn
yarn add vtils

# pnpm
pnpm add vtils
```

若在国内，推荐安装 [tbify](https://github.com/fjc0k/tbify#readme) 使用淘宝镜像加速：

```bash
# npm
tnpm i vtils

# yarn
tyn add vtils

# pnpm
tpm add vtils
```

## 使用

### 在 NodeJS 中使用

```ts
// 基础工具库
import { wait, isNumber, EventBus, base64Encode } from 'vtils'

// 日期时间工具库
import { formatRelative, subDays, zhCN } from 'vtils/date'

// React 工具库
import { useClassName, useToggle, useScrollLoadMore } from 'vtils/react'

// 验证工具库
import { yup } from 'vtils/validator'

// 类型工具库
import { OmitStrict, LiteralUnion, PartialDeep } from 'vtils/types'

// 小程序工具库
import { getTopBarInfo, navigatePageTo, redirectPageTo } from 'vtils/mp'
```

详细用法见文档：[https://fjc0k.github.io/vtils/v4/](https://fjc0k.github.io/vtils/v4/)。

### 在 Taro 3 中使用

在 [Taro 3](https://taro.js.org/) 中使用前需要修改 Webpack 配置，在 `config/index.js` 中的 `mini` 字段下设置：

```ts
mini: {
  webpackChain(config) {
    // 该插件会影响 resolve.extensions 的表现，删去
    config.resolve.plugins.delete('MultiPlatformPlugin')
    // 支持 .taro.js 后缀
    config.resolve.extensions.prepend('.taro.js')
  },
}
```

然后，就可以愉快地使用了：

```ts
// React 工具库
import { useSearchParam } from 'vtils/react'

// 小程序工具库
import { useTopBarInfo } from 'vtils/mp'

export default function () {
  const id = +useSearchParam('id')!
  const topBarInfo = useTopBarInfo()
  // ...
}
```

### 在 Deno 中使用

[Deno](https://deno.land/) 下暂只支持基础工具库。

```ts
// 基础工具库
import {
  wait,
  isNumber,
  EventBus,
  base64Encode,
} from 'https://cdn.skypack.dev/vtils@4.138.0'
```

### 自定义打包

你可在本地或 [https://labs.play-with-docker.com/](https://labs.play-with-docker.com/) 上运行下面的命令，然后打开 `http://localhost:9099`，接着选择你需要的工具，最后点击开始打包，等待请求执行完成后即可获取仅包含选中工具的 js 代码以及对应的类型定义。

```bash
docker run --rm -p 9099:9099 jayfong/vtils
```

## 许可

Jay Fong (c) MIT
