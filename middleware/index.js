function Middleware() {
  this.steps = []
  this.finalStep = null
}

Middleware.prototype.next = function() {
  if (this.steps.length) {
    ;(this.steps.shift())()
  } else {
    this.finalStep()
  }
}

Middleware.prototype.use = function(fn) {
  this.steps.push((function(ctx, fun) {
    return fun.bind(ctx, ctx.next.bind(ctx))
  })(this, fn))
}

Middleware.prototype.go = function(fn) {
  this.finalStep = fn
  ;(this.steps.shift())()
}

module.exports = Middleware
