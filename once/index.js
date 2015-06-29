var once = function(fn) {
  var executed = false

  return function() {
    var realArg = [].slice.call(arguments)

    if (!executed) {
      result = fn.apply(this, realArg)
      executed = true
    }
    return result
  }
}

module.exports = once
