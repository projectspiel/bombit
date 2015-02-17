var mixins = mixins || {};

mixins.Collidable = function (options) {
    if (!this.isInitializable || !this.isSimulable || !this.isPositionable || !this.isSprite) {
        throw "Dependencies not met";
    }
    this.isCollidable = true;

    var callback = options.callback,
        hitAreaRadius = options.hitAreaRadius,
        collidables = mixins.Collidable.entities,
        response = new SAT.Response();

    this.onInit(function () {
        this.hitArea = new SAT.Circle(new SAT.Vector(this.pos.x, this.pos.y), hitAreaRadius);
        collidables.push(this);
    });

    this.onSimulate(function (dt) {
        this.checkCollisions();
    });

    this.checkCollisions = function () {
        this.hitArea.pos.x = this.pos.x;
        this.hitArea.pos.y = this.pos.y;

        for (var i = 0; i < collidables.length; i++) {
            if (this === collidables[i]) {
                continue;
            }
            if (SAT.testCircleCircle(this.hitArea, collidables[i].getHitArea(), response)) {
                callback.call(this, response, collidables[i]);
            }
            response.clear();
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
