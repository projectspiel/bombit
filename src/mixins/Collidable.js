var mixins = mixins || {};

mixins.Collidable = function (options) {
    if (!this.isInitializable || !this.isSimulable || !this.isPositionable || !this.isSprite) {
        throw "Dependencies not met";
    }

    var collisionCallback = options.collisionCallback,
        boundsCallback = options.boundsCallback,
        hitAreaRadius = options.hitAreaRadius,
        collidables = mixins.Collidable.entities,
        response = new SAT.Response();

    this.onInit(function () {
        this.hitArea = new SAT.Circle(new SAT.Vector(this.pos.x, this.pos.y), hitAreaRadius);
        collidables.push(this);
    });

    this.onSimulate(function () {
        this.checkCollisions();
        this.checkBounds();
    });

    this.checkCollisions = function () {
        this.hitArea.pos.x = this.pos.x;
        this.hitArea.pos.y = this.pos.y;

        for (var i = 0; i < collidables.length; i++) {
            if (this === collidables[i]) {
                continue;
            }
            if (SAT.testCircleCircle(this.hitArea, collidables[i].getHitArea(), response)) {
                collisionCallback.call(this, response, collidables[i]);
            }
            response.clear();
        }
    };

    this.checkBounds = function () {
        var width =  MAP_WIDTH,
            height = MAP_HEIGHT;

        if (typeof boundsCallback !== "function") {
            return;
        }

        if (this.pos.x < 0) {
            boundsCallback.call(this, "left");
        }

        if (this.pos.x > width) {
            boundsCallback.call(this, "right");
        }

        if (this.pos.y < 0) {
            boundsCallback.call(this, "top");
        }

        if (this.pos.y > height) {
            boundsCallback.call(this, "bottom");
        }
    };

    this.getHitArea = function () {
        return this.hitArea;
    };
};
mixins.Collidable.entities = [];

mixins.Collidable.removeEntity = function (entity) {
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i] === entity) {
            this.entities.splice(i, 1);
            return;
        }
    }
};

mixins.Collidable.getAtPoint = function (point) {
    var collidables = mixins.Collidable.entities,
        satPoint = new SAT.Vector(point.x, point.y);
    for (var i = 0; i < collidables.length; i++) {
        if (SAT.pointInCircle(satPoint, collidables[i].getHitArea())) {
            return collidables[i];
        }
    }

    return null;
};
