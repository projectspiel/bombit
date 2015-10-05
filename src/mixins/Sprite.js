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
        this.isCached = false;
        this.sprite = new createjs.Sprite(new createjs.SpriteSheet(spriteSheetData));
        this.sprite.scaleX = this.sprite.scaleY = 2;
        this.addDisplayObject(this.sprite);
        this._currentSpriteState = "idle";
    });

    this.onRender(function () {
        if (this.isCached) {
            this.sprite.cache(-50, -100, 100, 200);
        }
    });

    //@TODO Make private after removing all uses
    this.gotoAndPlay = function (state) {
        if (this._currentSpriteState !== state) {
            this.sprite.gotoAndPlay(state);
            this._currentSpriteState = state;
        }
    };

    this.onAnimationEnd = function (animationNames, callback) {
        var that = this;
        this.sprite.addEventListener("animationend", function(event) {
            for (var i = 0; i < animationNames.length; i++) {
                if (event.name === animationNames[i]) {
                    callback.apply(that);
                }
            }
        })
    };

    this.blink = function () {
        this.isCached = true;

        var that = this;
        (function b(i) {
            var m = 1 - i * 0.1;
            var p = i * 255 / 10;

            that.sprite.filters = [
                new createjs.ColorFilter(m, m, m, 1, p, 0, 0, 0)
            ];

            if (i > 0) {
                window.setTimeout(b, 15, --i);
            } else {
                that.sprite.filters = [];
                that.isCached = false;
                that.sprite.uncache();
            }
        })(10);
    };
};
