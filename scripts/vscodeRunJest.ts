import exec from 'execa'
import path from 'path'

const args = process.argv.slice(2)
const file = args[0]

exec(
  'jest',
  [
    ...args,
    '--coverage',
    '--collectCoverageFrom',
    file.replace('.test.', '.').replace(`${path.join(__dirname, '..')}/`, ''),
  ],
  {
    stdio: 'inherit',
  },
)
