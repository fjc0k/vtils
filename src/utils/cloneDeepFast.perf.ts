import { cloneDeep, range } from 'lodash-uni'
import { cloneDeepFast } from './cloneDeepFast'
import { runBenchmark } from '../dev'

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
