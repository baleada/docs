module.exports = function(source, map, meta) {
  console.log(this.fs.statSync(this.resource))
  return source
}
