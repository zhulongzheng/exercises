var memoize = function(fn) {
  var rst = {}

  return function() {
    var track = rst

    for (var i = 0; i < arguments.length; i++) {
      if (track[arguments[i]]) {
        if (i === arguments.length - 1) {
          return track[arguments[i]]
        } else {
          track = track[arguments[i]]
        }
      } else {
        if (i === arguments.length - 1) {
          track[arguments[i]] = fn.apply(null, [].slice.call(arguments))
          return track[arguments[i]]
        } else {
          track[arguments[i]] = {}
          track = track[arguments[i]]
        }
      }
    }
  }
}

module.exports = memoize
