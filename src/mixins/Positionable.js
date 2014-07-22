var mixins = mixins || {};

mixins.Positionable = function() {
    if (!this.isInitializable) { throw "Dependencies not met"; }
    this.isPositionable = true;

    this.onInit( function() {
        this.pos = Object.build(Vector);
    });

    this.position = function(x, y) {
        this.pos.set(x, y);
    };
};