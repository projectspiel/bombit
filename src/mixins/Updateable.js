var mixins = mixins || {};

mixins.Updateable = function(callback) {
    if (!this.isSprite || !this.isInitializable) {
        throw "Entity must be Sprite and Initializable";
    }

    this.onInit( function() {
        this.getDisplayObject().addEventListener("tick", function (event) {
            this._update(event.params[1]);
        }.bind(this));
    });

    this._update = callback;

    this.isUpdateable = true;
};
