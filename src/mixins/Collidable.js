var mixins = mixins || {};

mixins.Collidable = function(options) {
    if (!this.isInitializable || !this.isPositionable || !this.isSprite) { throw "Dependencies not met"; }
    this.isCollidable = true;

    var callback = options.callback,
        hitAreaRadius = options.hitAreaRadius;

    var collidables = mixins.Collidable.entities;
    var hitArea;

    this.onInit(function() {
        hitArea = new SAT.Circle(new SAT.Vector(this.pos.x, this.pos.y), hitAreaRadius);
        collidables.push(this);
    });



    this.afterInit(function() {
        if (DISPLAY_DEBUG) {
            if (!this.isRenderable) { throw "Dependencies not met"; }

            var referenceDisplayObject = createCollisionAreaDisplayObject();
            referenceDisplayObject.zindex = -1000;

            this.addDisplayObject(referenceDisplayObject);

            this.onRender(function() {
                if (!this.isRenderable) { throw "Dependencies not met"; }
                referenceDisplayObject.y = this.pos.z;
            });
        }
    });

    this.checkCollisions = function() {
        hitArea.pos.x = this.pos.x;
        hitArea.pos.y = this.pos.y;
        var response,
            collided;

        for(var i = 0 ; i < collidables.length ; i++) {
            if (this === collidables[i]) { continue; }
            response = new SAT.Response();
            collided = SAT.testCircleCircle(hitArea, collidables[i].getHitArea(), response);
            if(collided) {
                callback.call(this, response);
            }
        }
    };

    var that = this;
    var createCollisionAreaDisplayObject = function() {
        var shape = new createjs.Shape();

        mappedBoundingBox = that._mapToCanvas(Object.build(Vector, hitAreaRadius * 2, hitAreaRadius * 2));
        shape.graphics.beginFill("rgba(250,0,0,0.5)").drawEllipse(
            -mappedBoundingBox.x/2,
            -mappedBoundingBox.y/2,
            mappedBoundingBox.x,
            mappedBoundingBox.y
        );

        return shape;
    };

    this.getHitArea = function() {
        return hitArea;
    };
};
mixins.Collidable.entities = [];
