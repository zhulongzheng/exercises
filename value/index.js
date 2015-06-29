var value = function(fnOrValue) {
      var result = fnOrValue

      while (typeof result === 'function') {
        result = result()
      }

      return result
    }

module.exports = value
