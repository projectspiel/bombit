var entities = entities || {};

var MASS = 1;

entities.Ball = function(x, y, z) {
    this.init();
    this.position(x, y, z);
    this.render();

    this.onTick(this.getSpriteDisplayObject(), function (data) {
            var friction = this.vel.clone().scalar(-FRICTION_FORCE);
            this.force.add(friction);

            /*var gravity = Object.build(Vector);
            gravity.set(0, 0, -9.8 * 50);
            this.force.add(gravity);*/

            this.move(data.dt);
            this.force.reset();

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

mixins.Physical.call(entities.Ball.prototype, MASS);

mixins.Updateable.call(entities.Ball.prototype);
mixins.HasShadow.call(entities.Ball.prototype, 8 * 2, 8 * 2);