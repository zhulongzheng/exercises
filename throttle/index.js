var throttle = function(fn, timeSpace) {
      var first = true
        , lastStart
        , timer

      return function() {
        var realArg = [].slice.call(arguments)
          , eachNow = new Date()
          , timePassed = eachNow - lastStart
          , innerThis = this

        if (first) {
          fn.apply(innerThis, realArg)
          first = false
          lastStart = eachNow
        } else if (timePassed > timeSpace) {
          clearTimeout(timer)
          fn.apply(innerThis, realArg)
          lastStart = eachNow
        } else {
          clearTimeout(timer)
          timer = setTimeout(function() {
            fn.apply(innerThis, realArg)
            lastStart = new Date()
            clearTimeout(timer)
          }, timeSpace - timePassed + 1) // hacky?
        }
      }
    }

module.exports = throttle
