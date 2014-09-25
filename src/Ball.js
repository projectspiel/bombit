var entities = entities || {};

entities.Ball = function(x, y, z) {
    this.init();
    this.initPosition(x, y, z);
    this.render();

    this._vel.set(50, 50, 50);

    this.onUpdate(function (dt) {
        this.render();
    });
};

mixins.Initializable.call(entities.Ball.prototype);
mixins.Updateable.call(entities.Ball.prototype);
mixins.Simulable.call(entities.Ball.prototype);
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
        var vector = Object.build(Vector, -1000 * intersection.overlapV.x, -1000 * intersection.overlapV.y, 2000);
        this.force.add(vector);
    },
    hitAreaRadius: 8
});

mixins.Physical.call(entities.Ball.prototype, { friction: 2, mass: 1, dampFactor: 0.6 } );

mixins.HasShadow.call(entities.Ball.prototype, 8 * 2, 8 * 2);
mixins.Debuggable.call(entities.Ball.prototype);
