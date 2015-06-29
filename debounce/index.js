var debounce = function(fn, timeSpace) {
      var start = new Date()
        , timer

      return function() {
        var realArg = [].slice.call(arguments)
          , eachNow = new Date()
          , timePassed = eachNow - start
          , innerThis = this

        if (timePassed > timeSpace) {
          clearTimeout(timer)
          fn.apply(innerThis, realArg)
          start = eachNow
        } else {
          clearTimeout(timer)
          timer = setTimeout(function() {
            fn.apply(innerThis, realArg)
            start = new Date()
          }, timeSpace - timePassed)
        }
      }
    }

module.exports = debounce
