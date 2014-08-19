var mixins = mixins || {};

mixins.HasShadow = function(objectWidth, objectHeight) {
    if (!this.isRenderable) { throw "Dependencies not met"; }
    this.hasShadow = true;

    var displayObject;

    this.onInit(function() {
        displayObject = (function() {
            var shape = new createjs.Shape();
            var transformedHeight = objectHeight * 0.2;
            shape.graphics.beginFill("rgba(0,0,0,0.5)").drawEllipse(-objectWidth/2, -transformedHeight/2, objectWidth, transformedHeight);
            return shape;
        })();

        displayObject.zindex = -1;

        this.addDisplayObject(displayObject);
    });

    this.onRender(function() {
        displayObject.y = this.pos.z;
    });
};
