var mixins = mixins || {};

mixins.Collidable = function(callback) {
    if (!this.isSprite) {
        throw "Entity must be Sprite";
    }

    this.checkCollisions = function(stage) {
        for(var i = 0 ; i < stage.getNumChildren() ; i++) {
            var entity = stage.getChildAt(i);
            if (entity === this._displayObject) {
                continue;
            }

            var intersection = ndgmr.checkPixelCollision(this._displayObject, entity, 0, true);
            if(intersection) {
                callback.call(this, intersection);
            }
        }
    };

    this.isCollidable = true;
};

mixins.Collidable.init = function() {};