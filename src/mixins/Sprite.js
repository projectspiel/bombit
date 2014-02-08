var mixins = mixins || {};

mixins.Sprite = function(spriteSheetData) {
    if (!this.isPositionable) {
        throw "Entity must be Positionable";
    }

    this._displayObject = null; //@todo Make actually private
    this._spriteSheet = new createjs.SpriteSheet(spriteSheetData); //@todo Make actually private

    this.render = function() {
        this._displayObject.x = this.pos.x;
        this._displayObject.y = this.pos.y;
    };

    this.getDisplayObject = function() {
        return this._displayObject;
    };

    this.isSprite = true;
};

mixins.Sprite.init = function() {
    this._displayObject = new createjs.Sprite(this._spriteSheet);
    this.render();
};