var mixins = mixins || {};

// @DUP eventable
// @fixme extract logic into eventable mixin
mixins.Initializable = function() {
    this.isInitializable = true;

    var initCallbacks = [];
    var afterInitCallbacks = [];

    this.onInit = function(callable) {
        initCallbacks.push(callable);
    };

    this.afterInit = function(callable) {
        afterInitCallbacks.push(callable);
    };

    this.init = function() {
        for(var i = 0; i < initCallbacks.length; i++) {
            initCallbacks[i].apply(this);
        }

        for(var j = 0; j < afterInitCallbacks.length; j++) {
            afterInitCallbacks[j].apply(this);
        }
    };
};
