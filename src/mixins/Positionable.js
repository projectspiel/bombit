var mixins = mixins || {};

mixins.Positionable = function() {
    this.position = function(x, y) {
        this.pos.set(x, y);
    };

    this.isPositionable = true;
};

mixins.Positionable.init = function(params) {
    this.pos = new Vector(params.x, params.y);
};