var entities = entities || {};

entities.Ball = function(x, y, z) {
    var DAMP_FACTOR = 0.6,
        FRICTION_FORCE = 2;

    this.init();
    this.position(x, y, z);
    this.render();

    this.vel.set(50, 50, 50);

    this.onTick(this.getSpriteDisplayObject(), function (data) {
            if (this.pos.z === 0) {
                var friction = Object.build(Vector);
                friction.set(
                    this.vel.x * -FRICTION_FORCE,
                    this.vel.y * -FRICTION_FORCE,
                    this.vel.z
                );
                this.force.add(friction);
            }

            this.applyGravity();

            this.move(data.dt);
            this.force.reset();

            if (this.pos.z <= 0.05) {
                this.vel.z *= -1 * DAMP_FACTOR;
                this.pos.set(this.pos.x, this.pos.y, 0);
            }

            this.render();
        }
    );
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