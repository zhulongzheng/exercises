var curry = function(fn) {
      return function replacement() {
        var realArg = [].slice.call(arguments)
        if (realArg.length === fn.length) {
          return fn.apply(null, realArg)
        } else {
          return function() {
            return replacement.apply(null, realArg.concat([].slice.call(arguments)))
          }
        }
      }
    }

module.exports = curry
