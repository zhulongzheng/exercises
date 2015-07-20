var qsort = function(arr) {
      if (arr.length < 2) return arr

      var l = []
        , m = []

      for (var i = 1; i < arr.length; i++) {
        if (arr[i] < arr[0]) l.push(arr[i])
        else m.push(arr[i])
      }

      return qsort(l).concat(arr[0], qsort(m))
    }

module.exports = qsort
