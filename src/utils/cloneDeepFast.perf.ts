import { cloneDeep, range } from 'lodash-uni'
import { runBenchmark } from '../dev/index.ts'
import { cloneDeepFast } from './cloneDeepFast.ts'

const data = range(0, 100).map(i => ({
  i,
  c: range(0, 10).map(i => ({ i: [i] })),
}))

runBenchmark({
  ['lodash.cloneDeep']() {
    cloneDeep(data)
  },
  ['vtils.cloneDeepFast!fastest']() {
    cloneDeepFast(data)
  },
})
