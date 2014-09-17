var mixins = mixins || {};

mixins.Positionable = function() {
    if (!this.isInitializable || !this.isUpdateable) { throw "Dependencies not met"; }
    this.isPositionable = true;

    this.onInit(function() {
        this.pos = Object.build(Vector);
        this.nextPos = this.pos.clone();
    });

    this.afterInit(function() {
        if (DISPLAY_DEBUG) {
            if (!this.isRenderable) { throw "Dependencies not met"; }

            var referenceDisplayObject = (function() {
                var shape = new createjs.Shape();
                shape.graphics.beginFill("blue").drawCircle(0, 0, 5);
                return shape;
            })();

            this.addDisplayObject(referenceDisplayObject);

            this.onRender(function() {
                if (!this.isRenderable) { throw "Dependencies not met"; }
                referenceDisplayObject.y = this.pos.z;
            });
        }
    });

    this.initPosition = function(x, y, z) {
        this.nextPos.set(x, y, z);
        this.pos.set(x, y, z);
    };

    this.onUpdate( function() {
        this.pos = this.nextPos.clone();
    });
};
