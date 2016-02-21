var mixins = mixins || {};

mixins.Updateable = function () {
    if (!this.isInitializable) {
        throw "Dependencies not met";
    }

    this.isUpdateable = true;

    this.onInit(function () {
        this.callbacks = [];
    });

    this.onUpdate = function (callable) {
        this.callbacks.push(callable);
    };

    this.update = function (dt) {
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i].apply(this, [dt]);
        }
    };
};
