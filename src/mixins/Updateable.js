var mixins = mixins || {};

mixins.Updateable = function(callback) {
    this.isUpdateable = true;

    this.onTick = function(displayObject, callable) {
        var that = this;
        displayObject.addEventListener("tick", function (event) {
            callable.call(that, event.params[1]);
        });
    };

};
