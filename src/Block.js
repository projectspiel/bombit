var entities = entities || {};

entities.Block = function(x, y, resources) {
    components.asPositionable.init.call(this, {x: x, y: y});
    components.asSprite.init.call(this, {sprite: resources['blockSprite'], width: TILE_WIDTH, height: TILE_HEIGHT});

    this.render();
};

components.asPositionable.call(entities.Block.prototype);
components.asSprite.call(entities.Block.prototype);