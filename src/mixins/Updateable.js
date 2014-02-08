var mixins = mixins || {};

mixins.Updateable = function(callback) {
    if (!this.isSprite) {
        throw "Entity must be Sprite";
    }

    this._update = callback;

    this.isUpdateable = true;
};

mixins.Updateable.init = function() {
    this.getDisplayObject().addEventListener("tick", function (event) {
        this._update(event.params[1]);
    }.bind(this));
};