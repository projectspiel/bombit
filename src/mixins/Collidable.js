var mixins = mixins || {};

mixins.Collidable = function(callback) {
    if (!this.isSprite) {
        throw "Entity must be Sprite";
    }

    this._callback = callback;

    this.checkCollisions = function(stage) {
        for(var i = 0 ; i < stage.getNumChildren() ; i++) {
            var entity = stage.getChildAt(i);
            if (entity == this._displayObject) {
                continue;
            }

            var intersection = ndgmr.checkPixelCollision(this._displayObject, entity, 0, true);
            if(intersection) {this._callback(intersection)}
        }
    };

    this.isCollidable = true;
};

mixins.Collidable.init = function() {};