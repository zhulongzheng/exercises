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
          // lastStart = (new Date())
        } else if (timePassed < timeSpace) {
          clearTimeout(timer)
          timer = setTimeout(function() {
            fn.apply(innerThis, realArg)
            lastStart = new Date()
          }, timeSpace - timePassed)
        } else {
          fn.apply(innerThis, realArg)
          lastStart = eachNow
          clearTimeout(timer)
        }
      }
    }

module.exports = throttle
