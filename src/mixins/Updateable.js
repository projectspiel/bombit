var mixins = mixins || {};

mixins.Updateable = function(callback) {
    if (!this.isSprite) { throw "Dependencies not met"; }
    this.isUpdateable = true;

    this.onInit( function() {
        this.getDisplayObject().addEventListener("tick", function (event) {
            this._update(event.params[1]);
        }.bind(this));
    });

    this._update = callback;

};
