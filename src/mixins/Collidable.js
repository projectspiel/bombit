var mixins = mixins || {};

mixins.Collidable = function(callback) {
    if (!this.isSprite) {
        throw "Entity must be Sprite";
    }

    this.checkCollisions = function(stage) {
        for(var i = 0 ; i < stage.getNumChildren() ; i++) {
            var entity = stage.getChildAt(i);
            if (entity === this.getDisplayObject() || !entity.parentEntity || (entity.parentEntity && !entity.parentEntity.isCollidable)) {
                continue; // Don't collide with self or non-collidables
            }

            var intersection = ndgmr.checkPixelCollision(this.getDisplayObject(), entity, 0, true);
            if(intersection) {
                callback.call(this, intersection);
            }
        }
    };

    this.isCollidable = true;
};

mixins.Collidable.entities = [];

mixins.Collidable.init = function() {
    mixins.Collidable.entities.push(this);
};
