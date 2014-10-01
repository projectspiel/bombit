var mixins = mixins || {};

mixins.Debuggable = function() {
    this.isDebuggable = true;
    if (!DISPLAY_DEBUG) { return; }

    /* Positionable */
    this.afterInit(function() {
        this.debugPositionDisplayObject = (function() {
            var shape = new createjs.Shape();
            shape.graphics.beginFill("blue").drawCircle(0, 0, 5);
            return shape;
        })();

        this.addDisplayObject(this.debugPositionDisplayObject);
    });

    this.onRender(function() {
        this.debugPositionDisplayObject.y = this.pos.z;
    });


    /* Collidable  */

    this.afterInit(function() {
        var that = this;
        this.debugCollisionDisplayObject = (function() {
            var shape = new createjs.Shape();

            var mappedBoundingBox = that._mapToCanvas(new Vector(that.getHitArea().r * 2, that.getHitArea().r * 2));
            shape.graphics.beginFill("rgba(250,0,0,0.5)").drawEllipse(
                -mappedBoundingBox.x/2,
                -mappedBoundingBox.y/2,
                mappedBoundingBox.x,
                mappedBoundingBox.y
            );

            return shape;
        })();

        this.debugCollisionDisplayObject.zindex = -1000;

        this.addDisplayObject(this.debugCollisionDisplayObject);
    });


    this.onRender(function() {
        this.debugCollisionDisplayObject.y = this.pos.z;
    });

};
