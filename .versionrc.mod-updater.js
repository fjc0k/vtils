/**
 * @param {String} content
 */
module.exports.readVersion = content => {
  return content.match(/vtils@([^']+)'/)[1]
}

/**
 * @param {String} content
 * @param {String} version
 */
module.exports.writeVersion = (content, version) => {
  return content.replace(/(?<=vtils@)[^']+(?=')/g, version)
}
