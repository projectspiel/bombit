var mixins = mixins || {};

mixins.Positionable = function() {
    if (!this.isInitializable) { throw "Dependencies not met"; }
    this.isPositionable = true;

    this.onInit(function() {
        this.pos = Object.build(Vector);
    });

    this.afterInit(function() {
        if (DISPLAY_DEBUG) {
            if (!this.isRenderable) { throw "Dependencies not met"; }
            this.addDisplayObject(createReferenceDisplayObject());
        }
    });

    this.position = function(x, y) {
        this.pos.set(x, y);
    };

    var createReferenceDisplayObject = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("blue").drawCircle(0, 0, 5);
        return shape;
    };
};