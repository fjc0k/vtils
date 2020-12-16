import { range } from 'lodash-uni'
import { Suite } from 'benchmark'
import { TreeData } from './TreeData'

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

new Suite()
  .add('tree-tool#filter', () => {
    treeTool.filter(data1, (node: any) => node.id.endsWith('.1'))
  })
  .add('vtils#TreeData', () => {
    new TreeData(data2).filter(_ => _.node.id.endsWith('.1'))
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
