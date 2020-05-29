const pkg = require('./package.json')

/**
 * @param {String} content
 */
module.exports.readVersion = content => {
  return content.match(new RegExp(`${pkg.name}@([^']+)'`))[1]
}

/**
 * @param {String} content
 * @param {String} version
 */
module.exports.writeVersion = (content, version) => {
  return content.replace(
    new RegExp(`(?<=${pkg.name}@)[^']+(?=')`, 'g'),
    version,
  )
}
