var getType = function(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1)
    }
  , isArray = function(arr) {
      return getType(arr) === 'Array'
    }
  , flatten = function(arr) {
      return arr.reduce(function(acc, cur) {
        if (!isArray(cur)) {
          acc.push(cur)
        } else {
          acc = acc.concat(flatten(cur))
        }
        return acc
      }, [])
    }

module.exports = flatten
