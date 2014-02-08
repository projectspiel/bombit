var mixins = mixins || {};

mixins.Positionable = function() {
    this.position = function(x, y) {
        this.pos.set(x, y);
    };

    this.isPositionable = true;
};

mixins.Positionable.init = function(x, y) {
    this.pos = new Vector(x, y);
};