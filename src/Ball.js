var entities = entities || {};

entities.Ball = function(x, y, z) {
    var DAMP_FACTOR = 0.6,
        FRICTION_FORCE = 2;

    this.init();
    this.position(x, y, z);
    this.render();

    this.vel.set(50, 50, 50);

    this.onTick(this.getSpriteDisplayObject(), function (data) {
        this.applyFriction(FRICTION_FORCE);
        this.applyGravity();
        this.move(data.dt);
        this.checkBounds(DAMP_FACTOR, MAP_WIDTH, MAP_HEIGHT);

        this.checkCollisions(data.stage);

        this.render();
    });
};

mixins.Initializable.call(entities.Ball.prototype);
mixins.Positionable.call(entities.Ball.prototype);
mixins.Renderable.call(entities.Ball.prototype);

mixins.Sprite.call(entities.Ball.prototype, {
    images: [resources.ballImage],
    frames: {
        width: 8,
        height: 8,
        regX: 4,
        regY: 8
    }
});

mixins.Collidable.call(entities.Ball.prototype, {
    callback: function(intersection) {
        console.log('Ball collided');
    },
    boundingBox: Object.build(Vector, 100, 100)
});

mixins.Physical.call(entities.Ball.prototype, 1);

mixins.Updateable.call(entities.Ball.prototype);
mixins.HasShadow.call(entities.Ball.prototype, 8 * 2, 8 * 2);
