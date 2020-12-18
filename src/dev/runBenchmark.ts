import { formatNumber, Options, Suite } from 'benchmark'
import Table from 'cli-table3'

export function runBenchmark(
  suites: Record<string, () => any>,
  options?: Options,
) {
  const table = new Table({
    head: ['name', 'ops/sec'],
    colAligns: ['left', 'right'],
  })
  const suite = new Suite()
  let expectFastestName: string | undefined
  for (let name of Object.keys(suites)) {
    const fn = suites[name]
    if (name.endsWith('!fastest')) {
      name = name.replace(/!fastest$/, '')
      expectFastestName = name
    }
    suite.add(name, fn)
  }
  suite.on('cycle', function (event: any) {
    table.push([event.target.name, formatNumber(Math.round(event.target.hz))])
    // console.log(arguments, event.target.stats, String(event.target))
  })
  suite.on('complete', function (this: any) {
    const actualFastestName = this.filter('fastest').map('name')[0]
    // console.log(`Fastest is ${actualFastestName}`)
    if (expectFastestName != null && expectFastestName !== actualFastestName) {
      throw new Error(
        `Expect fastest is ${expectFastestName}, actual fastest is ${actualFastestName}.`,
      )
    }
    console.log(
      table
        .sort(
          (a, b) =>
            (b as any)[1].replace(/,/, '') - (a as any)[1].replace(/,/, ''),
        )
        .toString(),
    )
  })
  suite.run(options)
}
