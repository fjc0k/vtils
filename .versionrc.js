/** @type import('standard-version').Options */
module.exports = {
  bumpFiles: [
    {
      filename: 'mod.ts',
      updater: '.versionrc.mod-updater.js',
    },
  ],
}
