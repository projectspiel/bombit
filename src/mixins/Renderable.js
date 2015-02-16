var mixins = mixins || {};

// @DUP eventable
// @fixme extract logic into eventable mixin
mixins.Renderable = function () {
    if (!this.isInitializable || !this.isPositionable) {
        throw "Dependencies not met";
    }
    this.isRenderable = true;

    var renderCallbacks = [];

    this.onInit(function () {
        this.container = new createjs.Container();
    });

    this.addDisplayObject = function (displayObject) {
        this.container.addChild(displayObject);
        this.container.sortChildren(function (obj1, obj2, options) {
            var obj1zindex = obj1.zindex ? obj1.zindex : 0;
            var obj2zindex = obj2.zindex ? obj2.zindex : 0;

            if (obj1zindex > obj2zindex) {
                return 1;
            }
            if (obj1zindex < obj2zindex) {
                return -1;
            }
            return 0;
        });
    };

    this.getDisplayObject = function () {
        return this.container;
    };

    this.onRender = function (callable) {
        renderCallbacks.push(callable);
    };

    this.render = function () {
        for (var i = 0; i < renderCallbacks.length; i++) {
            renderCallbacks[i].apply(this);
        }

        var displayVector = this.getDisplayPosition();

        this.container.x = displayVector.x;
        this.container.y = displayVector.y;
    };

    this._mapToCanvas = function (vector) {
        var newVector = new Vector(
            vector.x * CANVAS_WIDTH / MAP_WIDTH,
            vector.y * CANVAS_HEIGHT / MAP_HEIGHT
        );

        //@fixme Added this check since sometimes z is NaN and
        //       I ended up with an y with value 0. Im not sure why
        //       z is NaN, probably a bug.
        if (typeof vector.z === "number" && !isNaN(vector.z)) {
            newVector.y -= vector.z;
        }

        return newVector;
    };

    // Transforms 2D map position to
    // visual position on the map
    this.getDisplayPosition = function () {
        return this._mapToCanvas(this.pos);
    };
};
