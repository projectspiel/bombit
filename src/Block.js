var entities = entities || {};

entities.Block = function(x, y) {
    this.init();
    this.position(x, y);
    this.render();
};

mixins.Initializable.call(entities.Block.prototype);
mixins.Positionable.call(entities.Block.prototype);

mixins.Sprite.call(entities.Block.prototype, {
    images: [resources.blockImage],
    frames: {
        width: 50,
        height: 50,
        regX: 25,
        regY: 25
    }
});

mixins.Collidable.call(entities.Block.prototype, {
    callback: function(intersection) {
        console.log('block collided');
    },
    boundingBox: Object.build(Vector, 100, 100)
});
