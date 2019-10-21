import _ from 'shelljs'
import fs from 'fs'
import globby from 'globby'
import path from 'path'
import postcss from 'postcss'

async function processScssFile(file: string) {
  const parsedTestFilePath = path.parse(file)
  const {css} = await postcss([
    require('@csstools/postcss-sass')({
      includePaths: [parsedTestFilePath.dir],
    }),
  ]).process(
    fs.readFileSync(file).toString(),
    {syntax: require('postcss-scss'), from: file},
  )
  return css
}

test('单测正常', async () => {
  const testFiles = globby.sync(
    path.join(__dirname, '../src/**/*.test.scss'),
    {absolute: true},
  )
  await Promise.all(
    testFiles.map(async testFile => {
      expect(
        await processScssFile(testFile),
      ).toMatchSnapshot(
        path.parse(testFile).base,
      )
    }),
  )
})

test('打包正常', async () => {
  _.cd(path.join(__dirname, '..'))
  _.exec('yarn bundle')
  expect(
    await processScssFile(path.join(__dirname, 'bundle.test.scss')),
  ).toMatchSnapshot('bundle.test.scss')
})
