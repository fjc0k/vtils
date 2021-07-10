import 'antd/dist/antd.css'
import * as libs from './libs'
import React, { useCallback, useState } from 'react'
import { Button, Input, message, TreeSelect } from 'antd'
import { css } from '@emotion/css'

const modules = Object.keys(libs).map(lib => ({
  title: lib,
  value: `${lib}.*`,
  children: Object.keys((libs as any)[lib]).map(mo => ({
    title: `${lib}.${mo}`,
    value: `${lib}.${mo}`,
  })),
}))

export function App() {
  const [importModules, setImportModules] = useState<string>('')
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const [js, setJs] = useState('')
  const [dts, setDts] = useState('')

  const handleImportClick = useCallback(() => {
    setSelectedModules(
      importModules
        .replace(/^\/\/\s*/, '')
        .split(',')
        .map(item => item.trim())
        .filter(Boolean),
    )
  }, [importModules])

  const handleBundleClick = useCallback(async () => {
    const hideLoading = message.loading('生成中...', 0)
    const {
      js,
      dts,
    }: {
      js: string
      dts: string
    } = await fetch(
      `${
        // @ts-ignore
        import.meta.env.DEV ? 'http://localhost:9099' : location.origin
      }/?modules=${selectedModules.join(',')}`,
    ).then(res => res.json())
    setJs(js)
    setDts(dts)
    hideLoading()
  }, [selectedModules])

  const handleCopyJsClick = useCallback(() => {
    libs.utils.copyTextToClipboard(libs.utils.dedent`
      // ${selectedModules.join(',')}

      ${js}
    `)
    message.success('复制成功')
  }, [selectedModules, js])

  const handleCopyDtsClick = useCallback(() => {
    libs.utils.copyTextToClipboard(dts)
    message.success('复制成功')
  }, [dts])

  return (
    <div
      className={css`
        width: 500px;
        margin: 0 auto;
        padding-top: 20px;
      `}>
      <h1>导入模块</h1>
      <Input
        placeholder='请输入'
        value={importModules}
        onChange={e => setImportModules(e.target.value)}
      />
      <Button
        type='primary'
        className={css`
          margin-top: 20px;
        `}
        onClick={handleImportClick}>
        确定导入
      </Button>
      <h1
        className={css`
          margin-top: 20px;
        `}>
        选择模块
      </h1>
      <TreeSelect
        treeData={modules}
        treeCheckable={true}
        placeholder='请选择'
        maxTagCount={40}
        className={css`
          width: 100%;
        `}
        value={selectedModules}
        onChange={setSelectedModules}
      />
      <Button
        type='primary'
        className={css`
          margin-top: 20px;
        `}
        onClick={handleBundleClick}>
        开始打包
      </Button>
      <div
        className={css`
          margin-top: 20px;
        `}>
        {js && (
          <Button type='primary' onClick={handleCopyJsClick}>
            复制 JS
          </Button>
        )}
        {dts && (
          <Button
            type='primary'
            className={css`
              margin-left: 20px;
            `}
            onClick={handleCopyDtsClick}>
            复制 DTS
          </Button>
        )}
      </div>
    </div>
  )
}
