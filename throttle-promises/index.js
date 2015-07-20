var throttlePromises = function(limit, list) {
      return new Promise(function(resolve, reject) {
        var handled = 0
          , reached = 0
          , handling = 0
          , rsts = []
          , thenCb = function(seq) {
              return function(rst) {
                rsts[seq] = rst
                if (++handled === list.length) {
                  resolve(rsts)
                } else {
                  getOneAndHandle()
                }
              }
            }
          , getOneAndHandle = function() {
              if (++reached <= list.length) {
                list[reached - 1]()
                  .then(thenCb(reached - 1))
                  .catch(throwErr)
              }
            }
          , throwErr = function (err) {
              reject(err)
            }

        for (; handling < limit && handling < list.length; handling++) {
          list[reached++]()
            .then(thenCb(reached - 1))
            .catch(throwErr)
        }
      })
    }

// var throttlePromises = function(limit, promiseFactories) {
//       return new Promise(function(resolve) {
//         var resolved = [];
//         var openSlots = limit;
//         var nextIndex = 0;
//         next(nextIndex);
//
//         function next(index) {
//           if (index < promiseFactories.length) {
//             if (openSlots > 0) {
//               nextIndex++;
//               openSlots--;
//               var promise = promiseFactories[index]();
//               promise.then(function(result) {
//                 resolved[index] = result;
//                 openSlots++;
//                 next(nextIndex)
//               });
//               next(nextIndex);
//             }
//           } else {
//             if (openSlots === limit) {
//               resolve(resolved);
//             }
//           }
//         }
//       });
//     }

module.exports = throttlePromises
