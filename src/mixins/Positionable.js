var mixins = mixins || {};

mixins.Positionable = function() {
    this.position = function(x, y) {
        this.pos.set(x, y);
    };

    // Transforms 2D map position to
    // visual position on the map
    this.getDisplayPosition = function() {
        return Object.build( Vector,
                             this.pos.x * CANVAS_WIDTH / MAP_WIDTH,
                             this.pos.y * CANVAS_HEIGHT / MAP_HEIGHT
                           );
    };

    this.isPositionable = true;
};

mixins.Positionable.init = function(x, y) {
    this.pos = Object.build(Vector, x, y);
};
