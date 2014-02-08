var entities = entities || {};

entities.Block = function(x, y, resources) {
    mixins.Positionable.init.call(this, {x: x, y: y});
    mixins.Sprite.init.call(this, {sprite: resources['blockSprite'], width: TILE_WIDTH, height: TILE_HEIGHT});

    this.render();
};

mixins.Positionable.apply(entities.Block.prototype);
mixins.Sprite.apply(entities.Block.prototype);