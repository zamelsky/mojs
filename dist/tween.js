var Tween, h;

h = require('./h');

Tween = (function() {
  Tween.prototype.defaults = {
    duration: 600,
    delay: 0,
    yoyo: false,
    durationElapsed: 0,
    delayElapsed: 0,
    repeat: 0,
    onStart: null,
    onComplete: null
  };

  function Tween(o) {
    this.o = o != null ? o : {};
    this.vars();
    this.extendDefaults();
    this;
  }

  Tween.prototype.vars = function() {
    this.h = h;
    this.props = {};
    return this.progress = 0;
  };

  Tween.prototype.extendDefaults = function() {
    this.h.extend(this.o, this.defaults);
    return this.onUpdate = this.o.onUpdate;
  };

  Tween.prototype.start = function() {
    var _ref;
    this.props.startTime = Date.now() + this.o.delay;
    this.props.endTime = this.props.startTime + this.o.duration;
    this.isStarted = true;
    if (!this.isOnStartFired) {
      if ((_ref = this.o.onStart) != null) {
        _ref.apply(this);
      }
      this.isOnStartFired = true;
    }
    return this;
  };

  Tween.prototype.update = function(time) {
    var _ref;
    if (time >= this.props.endTime) {
      this.props.elapsed = this.o.duration;
      if (!this.isCompleted) {
        if ((_ref = this.o.onComplete) != null) {
          _ref.apply(this);
        }
        this.isCompleted = true;
      }
      return true;
    }
    this.props.elapsed = time - this.props.startTime;
    return typeof this.onUpdate === "function" ? this.onUpdate(this.getProgress()) : void 0;
  };

  Tween.prototype.getProgress = function() {
    var progress;
    return progress = Math.min(this.props.elapsed / this.o.duration, 1);
  };

  return Tween;

})();


/* istanbul ignore next */

if ((typeof define === "function") && define.amd) {
  define("Tween", [], function() {
    return Tween;
  });
}

if ((typeof module === "object") && (typeof module.exports === "object")) {
  module.exports = Tween;
}


/* istanbul ignore next */

if (typeof window !== "undefined" && window !== null) {
  if (window.mojs == null) {
    window.mojs = {};
  }
}

if (typeof window !== "undefined" && window !== null) {
  window.mojs.Tween = Tween;
}