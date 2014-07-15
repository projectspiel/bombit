var mixins = mixins || {}

mixins.Initializable = function() {
    if (this.isInitializable === true) { return; }
    this.isInitializable = true;

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

};
