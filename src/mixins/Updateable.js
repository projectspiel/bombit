var mixins = mixins || {};

mixins.Updateable = function(callback) {
    if (this.isUpdateable) { return; }
    this.isUpdateable = true;

    mixins.Sprite.call(this);

    this.onInit( function() {
        this.getDisplayObject().addEventListener("tick", function (event) {
            this._update(event.params[1]);
        }.bind(this));
    });

    this._update = callback;

};
