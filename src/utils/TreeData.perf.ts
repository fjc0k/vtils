import { range } from 'lodash-uni'
import { runBenchmark } from '../dev/index.ts'
import { TreeData } from './TreeData.ts'

// @ts-ignore
import treeTool from 'tree-tool'

const data1 = range(0, 10).map(i => ({
  id: `${i}`,
  children: range(0, 10).map(i2 => ({
    id: `${i}.${i2}`,
    children: [],
  })),
}))
const data2 = range(0, 10).map(i => ({
  id: `${i}`,
  children: range(0, 10).map(i2 => ({
    id: `${i}.${i2}`,
    children: [],
  })),
}))

runBenchmark({
  ['tree-tool.filter']() {
    treeTool.filter(data1, (node: any) => node.id.endsWith('.1'))
  },
  ['vtils.TreeData']() {
    new TreeData(data2).filter(_ => _.node.id.endsWith('.1'))
  },
})
