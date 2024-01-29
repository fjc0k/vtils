/** @type import('standard-version').Options */
module.exports = {
  // ref: https://github.com/conventional-changelog/standard-version#can-i-use-standard-version-for-additional-metadata-files-languages-or-version-files
  bumpFiles: [
    {
      filename: 'package.json',
      type: 'json',
    },
    {
      filename: 'README.md',
      updater: '.versionrc.README-updater.cjs',
    },
  ],
}
