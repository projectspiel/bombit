var mixins = mixins || {}

mixins.Initializable = function() {
    // @fixme make private
    this._initCallbacks = [];

    this.onInit = function(callable) {
        this._initCallbacks.push(callable);
    }

    this.init = function() {
      for(var i = 0; i < this._initCallbacks.length; i++) {
        this._initCallbacks[i].apply(this);
      }
    };

    this.isInitializable = true;
};
