var mixins = mixins || {};

mixins.Sprite = function (spriteSheetData) {
    if (!this.isInitializable || !this.isRenderable) {
        throw "Dependencies not met";
    }
    if (this.isSprite === true) {
        return;
    }
    this.isSprite = true;

    this.onInit(function () {
        this.sprite = new createjs.Sprite(new createjs.SpriteSheet(spriteSheetData));
        this.sprite.scaleX = this.sprite.scaleY = 2;
        this.addDisplayObject(this.sprite);
        this._currentSpriteState = "idle";
    });

    //@TODO Make private after removing all uses
    this.gotoAndPlay = function (state) {
        if (this._currentSpriteState !== state) {
            this.sprite.gotoAndPlay(state);
            this._currentSpriteState = state;
        }
    };

    this.onAnimationEnd = function(animationNames, callback) {
        var that = this;
        this.sprite.addEventListener("animationend", function(event) {
            for (var i = 0; i < animationNames.length; i++) {
                if (event.name === animationNames[i]) {
                    callback.apply(that);
                }
            }
        })
    }
};
