const pkg = require('./package.json')

/**
 * @param {String} content
 */
module.exports.readVersion = content => {
  return content.match(new RegExp(`${pkg.name}@([\\w.-]+)`))[1]
}

/**
 * @param {String} content
 * @param {String} version
 */
module.exports.writeVersion = (content, version) => {
  const prevVersion = module.exports.readVersion(content)
  const nextVersion = version.includes('beta') ? prevVersion : version
  return content.replace(
    new RegExp(`(?<=${pkg.name}@)[\\w.-]+`, 'g'),
    nextVersion,
  )
}
