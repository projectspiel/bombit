var entities = entities || {};

entities.Block = function(x, y) {
    mixins.Positionable.init.call(this, x, y);
    mixins.Sprite.init.call(this);
};

mixins.Positionable.call(entities.Block.prototype);

mixins.Sprite.call(entities.Block.prototype, {
    images: [resources['blockImage']],
    frames: {width: TILE_WIDTH, height: TILE_HEIGHT, regX: TILE_WIDTH / 2, regY: TILE_HEIGHT / 2}
});