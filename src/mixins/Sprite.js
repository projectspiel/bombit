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

    this.gotoAndPlay = function(animation) {
        this.sprite.gotoAndPlay(animation);
    };
};
