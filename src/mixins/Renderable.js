var mixins = mixins || {};

// @DUP eventable
// @fixme extract logic into eventable mixin
mixins.Renderable = function() {
    if (!this.isInitializable || !this.isPositionable) { throw "Dependencies not met"; }
    this.isRenderable = true;

    var renderCallbacks = [];
    var container;

    this.onInit(function() {
        container = new createjs.Container();
    });

    this.addDisplayObject = function(displayObject) {
        container.addChild(displayObject);
    };

    this.getDisplayObject = function() {
        return container;
    };

    this.onRender = function(callable) {
        renderCallbacks.push(callable);
    };

    this.render = function() {
        for(var i = 0; i < renderCallbacks.length; i++) {
            renderCallbacks[i].apply(this);
        }

        var displayVector = this.getDisplayPosition();

        container.x = displayVector.x;
        container.y = displayVector.y;
    };

    this._mapToCanvas = function (vector) {
        return Object.build( Vector,
            vector.x * CANVAS_WIDTH / MAP_WIDTH,
            vector.y * CANVAS_HEIGHT / MAP_HEIGHT );
    };

    // Transforms 2D map position to
    // visual position on the map
    this.getDisplayPosition = function() {
        return this._mapToCanvas(this.pos);
    };
};