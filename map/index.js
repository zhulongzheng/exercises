var map = function(arr, fn, ctx) {
      var result = []

      for (var i = 0; i < arr.length; i++) {
        result.push(fn.call(ctx, arr[i], i, arr))
      }

      return result
    }

module.exports = map
