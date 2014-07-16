var mixins = mixins || {}

mixins.Initializable = function() {
    if (this.isInitializable === true) { return; }
    this.isInitializable = true;

    var initCallbacks = [];

    this.onInit = function(callable) {
        initCallbacks.push(callable);
    }

    this.init = function() {
      for(var i = 0; i < initCallbacks.length; i++) {
        initCallbacks[i].apply(this);
      }
    };

};
