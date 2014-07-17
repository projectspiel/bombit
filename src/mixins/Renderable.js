var mixins = mixins || {};

// @DUP eventable
// @fixme extract logic into eventable mixin
mixins.Renderable = function() {
    this.isRenderable = true;

    var renderCallbacks = [];

    this.onRender = function(callable) {
        renderCallbacks.push(callable);
    }

    this.render = function() {
      for(var i = 0; i < renderCallbacks.length; i++) {
        renderCallbacks[i].apply(this);
      }
    };
}
