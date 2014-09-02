var mixins = mixins || {};

mixins.Sprite = function(spriteSheetData) {
    if (!this.isInitializable || !this.isRenderable) { throw "Dependencies not met"; }
    if (this.isSprite === true) { return; }
    this.isSprite = true;

    this.onInit( function() {
        this.sprite = new createjs.Sprite(new createjs.SpriteSheet(spriteSheetData));
        this.sprite.scaleX = this.sprite.scaleY = 2;
        this.addDisplayObject(this.sprite);
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
        return this.sprite;
    };

    this.gotoAndPlay = function(animation) {
        this.sprite.gotoAndPlay(animation);
    };
};
