<p align="center"><img width="200" src="https://raw.githubusercontent.com/fjc0k/vtils/master/logo.png" alt="logo"></p>

<p align="center"><a href="https://www.npmjs.com/package/@vtils/react"><img src="https://badge.fury.io/js/%40vtils%2Freact.svg" alt="NPM Version"></a> <a href="https://travis-ci.org/fjc0k/vtils"><img src="https://travis-ci.org/fjc0k/vtils.svg?branch=master" alt="Build Status"></a> <a href="https://codecov.io/gh/fjc0k/vtils"><img src="https://codecov.io/gh/fjc0k/vtils/branch/master/graph/badge.svg" alt="Coverage Status"></a> <img src="https://badgen.net/bundlephobia/min/@vtils/react" alt="Size"> <img src="https://badgen.net/bundlephobia/minzip/@vtils/react" alt="Gzip Size"> <img src="https://badgen.net/github/license/fjc0k/vtils" alt="License"></p>

<h2 align="center"><a href="https://github.com/fjc0k/vtils/tree/master/packages/vtils">vtils</a> 在 React 中的应用。</h2>

<p align="center">
  <a href="https://fjc0k.github.io/vtils/react">https://fjc0k.github.io/vtils/react</a>
</p>

## 安装

```bash
# yarn
yarn add @vtils/react

# or, npm
npm i @vtils/react --save
```

你也可通过 CDN 安装，然后使用全局变量 `vr` 访问相关工具：

```html
<script src="https://cdn.jsdelivr.net/npm/@vtils/react@2.59.0/lib/index.umd.min.js" crossorigin="anonymous"></script>
```

<!-- TYPEDOC -->

## 目录
<!-- React!目录 -->
👇 | 👇 | 👇 | 👇
--- | --- | --- | ---
[buildFunctionComponentCreator](#buildfunctioncomponentcreator) | [makeProps](#makeprops) | [useEasyValidator](#useeasyvalidator) | [useLiveEasyValidator](#useliveeasyvalidator)
[useLoadMore](#useloadmore) | [useScrollLoadMore](#usescrollloadmore) |  | 
<!-- Reacti目录 -->

## 列表

<!-- React!内容 -->
#### buildFunctionComponentCreator

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/react/src/functionComponentCreator.ts#L53) | [API](https://fjc0k.github.io/vtils/react/globals.html#buildfunctioncomponentcreator) | [回目录](#目录)</small>

构造一个函数组件创建器。

#### makeProps

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/react/src/functionComponentCreator.ts#L24) | [API](https://fjc0k.github.io/vtils/react/globals.html#makeprops) | [回目录](#目录)</small>

#### useEasyValidator

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/react/src/hooks/useEasyValidator.ts#L44) | [API](https://fjc0k.github.io/vtils/react/globals.html#useeasyvalidator) | [回目录](#目录)</small>

数据校验器。

```ts
const [name, setName] = useState('')
const [pass, setPass] = useState('')
const ev = useEasyValidator({ name, pass }, [
  {
    key: 'name',
    required: true,
    message: '姓名不能为空',
  },
  {
    key: 'pass',
    test: data => data.pass.length >= 6,
    message: '密码至少应为6位',
  },
])
const handleRegisterClick = useCallback(() => {
  ev.validate().then(res => {
    if (res.valid) {
      console.log(res.data)
    } else {
      console.log(res.firstUnvalidRuleMessage)
    }
  })
}, [])
```

#### useLiveEasyValidator

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/react/src/hooks/useLiveEasyValidator.ts#L34) | [API](https://fjc0k.github.io/vtils/react/globals.html#useliveeasyvalidator) | [回目录](#目录)</small>

实时数据校验器。

```ts
const [name, setName] = useState('')
const [pass, setPass] = useState('')
const evResult = useLiveEasyValidator({ name, pass }, [
  {
    key: 'name',
    required: true,
    message: '姓名不能为空',
  },
  {
    key: 'pass',
    test: data => data.pass.length >= 6,
    message: '密码至少应为6位',
  },
])
const button = (
  <Button disabled={!evResult.valid}>
    提交
  </Button>
)
```

#### useLoadMore

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/react/src/hooks/useLoadMore.ts#L49) | [API](https://fjc0k.github.io/vtils/react/globals.html#useloadmore) | [回目录](#目录)</small>

数据加载。

#### useScrollLoadMore

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/react/src/hooks/useScrollLoadMore.ts#L34) | [API](https://fjc0k.github.io/vtils/react/globals.html#usescrollloadmore) | [回目录](#目录)</small>

滚动数据加载。
<!-- Reacti内容 -->

## 许可

MIT ©️ Jay Fong
