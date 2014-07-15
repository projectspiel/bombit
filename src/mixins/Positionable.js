var mixins = mixins || {};

mixins.Positionable = function() {
    if (!this.isInitializable) {
        throw "Entity must be Initializable";
    }

    this.onInit( function() {
        this.pos = Object.build(Vector);
    });

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

