var mixins = mixins || {};

mixins.Collidable = function(options) {
    if (!this.isInitializable || !this.isPositionable || !this.isSprite) { throw "Dependencies not met"; }
    this.isCollidable = true;

    var callback = options.callback,
        boundingBox = options.boundingBox;

    this.onInit( function() {
        mixins.Collidable.entities.push(this);
    });

    this.checkCollisions = function(stage) {
        for(var i = 0 ; i < stage.getNumChildren() ; i++) {
            var entity = stage.getChildAt(i);
            if (entity === this.getDisplayObject() || !entity.parentEntity || (entity.parentEntity && !entity.parentEntity.isCollidable)) {
                continue; // Don't collide with self or non-collidables
            }

            var intersection = ndgmr.checkPixelCollision(this.getDisplayObject(), entity, 0, true);
            if(intersection) {
                callback.call(this, intersection);
            }
        }
    };

    this.getCollisionBoxPolygon = function() {
        return Object.build(entities.Polygon,
                            Object.build(Vector, -boundingBox.x / 2, -boundingBox.y / 2),
                            Object.build(Vector,  boundingBox.x / 2, -boundingBox.y / 2),
                            Object.build(Vector,  boundingBox.x / 2,  boundingBox.y / 2),
                            Object.build(Vector, -boundingBox.x / 2,  boundingBox.y / 2));
    };
};

mixins.Collidable.entities = [];