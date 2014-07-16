var mixins = mixins || {};

mixins.Updateable = function(callback) {
    if (!this.isSprite) { throw "Dependencies not met"; }
    this.isUpdateable = true;

    this.onInit( function() {
        this.getDisplayObject().addEventListener("tick", function (event) {
            callback.call(this, event.params[1]);
        }.bind(this));
    });


};
