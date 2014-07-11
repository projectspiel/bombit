var entities = entities || {};

entities.Block = function(x, y) {
    mixins.Positionable.init.call(this, x, y);
    mixins.Sprite.init.call(this);
    mixins.Collidable.init.call(this);
};

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

mixins.Collidable.call(entities.Block.prototype, function(intersection) {
    console.log('block collided');
});
