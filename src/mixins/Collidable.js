var mixins = mixins || {};

mixins.Collidable = function(options) {
    if (!this.isInitializable || !this.isPositionable || !this.isSprite) { throw "Dependencies not met"; }
    this.isCollidable = true;

    var callback = options.callback,
        boundingBox = options.boundingBox;

    this.afterInit(function() {
        if (DISPLAY_DEBUG) {
            if (!this.isRenderable) { throw "Dependencies not met"; }
            this.addDisplayObject(createCollisionBoxDisplayObject());
        }
    });

    this.checkCollisions = function(stage) {
        return; //@todo broken because stage.getChildAt(i) will return container displayObjects
        for(var i = 0 ; i < stage.getNumChildren() ; i++) {
            var entity = stage.getChildAt(i);
            if (entity === this.getSpriteDisplayObject() || !entity.parentEntity || (entity.parentEntity && !entity.parentEntity.isCollidable)) {
                continue; // Don't collide with self or non-collidables
            }

            var intersection = ndgmr.checkPixelCollision(this.getSpriteDisplayObject(), entity, 0, true);
            if(intersection) {
                callback.call(this, intersection);
            }
        }
    };

    var getCollisionBoxPolygon = function() {
        return Object.build(entities.Polygon,
                            Object.build(Vector, -boundingBox.x / 2, -boundingBox.y / 2),
                            Object.build(Vector,  boundingBox.x / 2, -boundingBox.y / 2),
                            Object.build(Vector,  boundingBox.x / 2,  boundingBox.y / 2),
                            Object.build(Vector, -boundingBox.x / 2,  boundingBox.y / 2));
    };

    var that = this;
    var createCollisionBoxDisplayObject = function() {
        var shape = new createjs.Shape(),
            vertices = getCollisionBoxPolygon().getVertices();

        for( var i=0; i < vertices.length; i++) {
            vertices[i] = that._mapToCanvas(vertices[i]);
        }

        // @fixme Make generic to polygons
        shape.graphics.beginStroke("blue").moveTo(vertices[0].x, vertices[0].y).
            lineTo(vertices[1].x, vertices[1].y).
            lineTo(vertices[2].x, vertices[2].y).
            lineTo(vertices[3].x, vertices[3].y).
            lineTo(vertices[0].x, vertices[0].y);
        return shape;
    };
};