var getType = function(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1)
    }
  , isArray = function(arr) {
      return getType(arr) === 'Array'
    }
  , async = {
      sequence: function() {
        /**
         * SOME INSPIRATION
         *
         * var fun1 = function(cb) {
         *   setTimeout(cb.bind(null, null, 'test'), 10);
         * };
         * var fun2 = function(cb, data) {
         *   setTimeout(cb.bind(null, null, data + 'ing'), 10);
         * };
         * var fun3 = function(cb, data) {
         *   setTimeout(cb.bind(null, null, data + '333'), 10);
         * };
         *
         * async.sequence([fun1, fun2, fun3])
         *
         * var nextFun2 = fun2
         * var m2 = function(err, data) {
         *       if (!err) {
         *         // nextFun2(null ,data)
         *         nextFun2(m3, data)
         *       } else {
         *         throw(err)
         *       }
         *     }
         * var nextFun3 = fun3
         * var m3 = function(err, data) {
         *       if (!err) {
         *         nextFun3(cb, data)
         *       } else {
         *         throw(err)
         *       }
         *     }
         *
         * fun2(m3, data)
         * fun1(m2)
         *
         * count = 0
         * var middle = function(err, data) {
         *       if (!err) {
         *         nextFun = q[++count]
         *         if (count === q.length - 1) {
         *           nextFun(null, data)
         *         } else {
         *           nextFun(middle, data)
         *         }
         *       } else {
         *         throw(err)
         *       }
         *     }
         */


        /**
         * Using recursive call to solve the regular deep callback.
         */
        var q = arguments[0]

        if (!isArray(q)) {
          q = [].prototype.slice.call(arguments)
        }

        if (q.length === 0) return

        return function(cb) {
          var first = q[0]
            , count = 0
            , nextFun
            , middle = function(err, data) {
                if (!err) {
                  nextFun = q[++count]
                  if (count === q.length - 1) {
                    nextFun(null, data)
                  } else {
                    nextFun(middle ,data)
                  }
                } else {
                  cb(err)
                }
              }

          q.push(cb)
          first(middle)
        }
      }
    , parallel: function() {
        var q = arguments[0]

        if (!isArray(q)) {
          q = [].prototype.slice.call(arguments)
        }

        if (q.length === 0) return

        return function(cb) {
          var count = 0
            , results = []
            , state = function(err, data) {
                if (!err) {
                  results.push(data)
                  if (++count === q.length) {
                    cb(null, results)
                  }
                } else {
                  cb(err)
                }
              }

          for (var i = 0; i < q.length; i++) {
            q[i](state)
          }
        }
      }
    , race: function() {
        var q = arguments[0]

        if (!isArray(q)) {
          q = [].prototype.slice.call(arguments)
        }

        if (q.length === 0) return

        return function(cb) {
          var executed = false
            , state = function(err, data) {
                if (!executed) {
                  if (!err) {
                    cb(null, data)
                  } else {
                    cb(err)
                  }
                  executed = true
                }
              }

          for (var i = 0; i < q.length; i++) {
            q[i](state)
          }
        }
      }
    }

module.exports = async
