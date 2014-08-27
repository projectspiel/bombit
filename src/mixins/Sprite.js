var mixins = mixins || {};

mixins.Sprite = function(spriteSheetData) {
    if (!this.isInitializable || !this.isRenderable) { throw "Dependencies not met"; }
    if (this.isSprite === true) { return; }
    this.isSprite = true;

    var sprite = null;

    this.onInit( function() {
        sprite = new createjs.Sprite(new createjs.SpriteSheet(spriteSheetData));
        sprite.scaleX = sprite.scaleY = 2;
        this.addDisplayObject(sprite);
    });

    if (this.calcDisplayVector === undefined) {
        this.calcDisplayVector = function() {
            return this.pos;
        };
    }

    /**
     * @fixme Kill this method and replace with a list of proxy methods
     */
    this.getSpriteDisplayObject = function() {
        return sprite;
    };

    this.gotoAndPlay = function(animation) {
        sprite.gotoAndPlay(animation);
    };
};
