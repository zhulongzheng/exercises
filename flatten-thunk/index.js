var flattenThunk = function(thunk) {
      return function(cb) {
        var ptnFun
        ptnFun = function(err, innerThunk) {
          if (typeof innerThunk !== 'function') {
            return cb(err, innerThunk)
          } else {
            return innerThunk(ptnFun)
          }
        }
        return thunk(ptnFun)
      }
    }

module.exports = flattenThunk
