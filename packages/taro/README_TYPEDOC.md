<p align="center"><img width="200" src="https://raw.githubusercontent.com/fjc0k/vtils/master/logo.png" alt="logo"></p>

<p align="center"><a href="https://www.npmjs.com/package/@vtils/taro"><img src="https://badge.fury.io/js/%40vtils%2Ftaro.svg" alt="NPM Version"></a> <a href="https://travis-ci.org/fjc0k/vtils"><img src="https://travis-ci.org/fjc0k/vtils.svg?branch=master" alt="Build Status"></a> <a href="https://codecov.io/gh/fjc0k/vtils"><img src="https://codecov.io/gh/fjc0k/vtils/branch/master/graph/badge.svg" alt="Coverage Status"></a> <img src="https://badgen.net/github/license/fjc0k/vtils" alt="License"></p>

<h2 align="center"><a href="https://github.com/fjc0k/vtils/tree/master/packages/vtils">vtils</a> 在 Taro 中的应用，且对 <a href="https://github.com/streamich/react-use">react-use</a>、<a href="https://github.com/fjc0k/vtils/tree/master/packages/react">@vtils/react</a> 中部分常用的工具函数、Hooks 进行了重新导出以适配 Taro。</h2>

<p align="center">
  <a href="https://fjc0k.github.io/vtils/taro">https://fjc0k.github.io/vtils/taro</a>
</p>

## 安装

```bash
# yarn
yarn add vtils @vtils/taro

# or, npm
npm i vtils @vtils/taro --save
```

## 使用

```js
import { useToggle } from '@vtils/taro'

export default function Edit() {
  const [showMore, toggleShowMore] = useToggle(false)
  return (
    // ...
  )
}
```

