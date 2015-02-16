var mixins = mixins || {};

// @fixme params in canvas coordinates system, should be in Map coordinates system.
mixins.HasShadow = function (objectWidth, objectHeight) {
    if (!this.isRenderable) {
        throw "Dependencies not met";
    }
    this.hasShadow = true;

    this.onInit(function () {
        this.shadowDisplayObject = (function () {
            var shape = new createjs.Shape();
            var transformedHeight = objectHeight * 0.2;
            shape.graphics.beginFill("rgba(0,0,0,0.5)").drawEllipse(-objectWidth / 2, -transformedHeight / 2, objectWidth, transformedHeight);
            return shape;
        })();

        this.shadowDisplayObject.zindex = -1;

        this.addDisplayObject(this.shadowDisplayObject);
    });

    this.onRender(function () {
        this.shadowDisplayObject.y = this.pos.z;
    });
};
