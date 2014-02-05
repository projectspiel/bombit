var entities = entities || {};

entities.Block = function(x, y, sprite) {
    components.asPositionable.init.call(this, {x: x, y: y});
    components.asRenderable.init.call(this, {sprite: sprite, width: TILE_WIDTH, height: TILE_HEIGHT});

    this.render();
};

components.asPositionable.call(entities.Block.prototype);
components.asRenderable.call(entities.Block.prototype);