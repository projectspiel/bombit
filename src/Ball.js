var entities = entities || {};

entities.Ball = function(x, y) {
    this.init();
    this.position(x, y);
    this.render();
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
        regY: 4
    }
});

mixins.Collidable.call(entities.Ball.prototype, {
    callback: function(intersection) {
        console.log('Ball collided');
    },
    boundingBox: Object.build(Vector, 100, 100)
});
