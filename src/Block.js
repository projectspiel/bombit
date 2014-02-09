var entities = entities || {};

entities.Block = function(x, y) {
    mixins.Positionable.init.call(this, x, y);
    mixins.Sprite.init.call(this);
};

mixins.Positionable.call(entities.Block.prototype);

mixins.Sprite.call(entities.Block.prototype, {
    images: [resources.blockImage],
    frames: {
        width: constants.TILE_WIDTH,
        height: constants.TILE_HEIGHT,
        regX: constants.TILE_WIDTH / 2,
        regY: constants.TILE_HEIGHT / 2
    }
});