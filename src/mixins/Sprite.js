var mixins = mixins || {};

mixins.Sprite = function(spriteSheetData) {
    if (!this.isPositionable) {
        throw "Entity needs to be Positionable";
    }

    this._spriteSheet = new createjs.SpriteSheet(spriteSheetData);

    this.render = function() {
        this.displayObject.x = this.pos.x;
        this.displayObject.y = this.pos.y;
    };

    this.getDisplayObject = function() {
        return this.displayObject;
    }

    this.isSprite = true;
};

mixins.Sprite.init = function() {
    this.displayObject = new createjs.Sprite(this._spriteSheet);
};