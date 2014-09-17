var mixins = mixins || {};

mixins.Updateable = function(callback) {
    this.isUpdateable = true;

    var callbacks = [];

    this.onUpdate = function(callable) {
        callbacks.push(callable);
    };

    this.update = function (dt) {
        for(var i in callbacks) {
            callbacks[i].apply(this, [dt]);
        }
    };

};
