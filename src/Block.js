var entities = entities || {};

entities.Block = function(x, y) {
    mixins.Positionable.init.call(this, {x: x, y: y});
    mixins.Sprite.init.call(this);

    this.render();
};

mixins.Positionable.apply(entities.Block.prototype);

mixins.Sprite.apply(entities.Block.prototype, [{
    images: [resources['blockImage']],
    frames: {width: TILE_WIDTH, height: TILE_HEIGHT, regX: TILE_WIDTH / 2, regY: TILE_HEIGHT / 2}
}]);