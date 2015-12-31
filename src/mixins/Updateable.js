var mixins = mixins || {};

mixins.Updateable = function () {
    "use strict";

    this.isUpdateable = true;

    var callbacks = [];

    this.onUpdate = function (callable) {
        callbacks.push(callable);
    };

    this.update = function (dt) {
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i].apply(this, [dt]);
        }
    };
};
