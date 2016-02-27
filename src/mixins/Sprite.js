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
        this.sprite.filters = [];
        this.sprite.scaleX = this.sprite.scaleY = 2;
        this.addDisplayObject(this.sprite);
        this._currentSpriteState = "idle";
        this._bounds = {
            width: this.sprite.getBounds().width,
            height: this.sprite.getBounds().height
        };
    });

    this.onRender(function () {
        if (this.sprite.filters && this.sprite.filters.length > 0) {
            this.sprite.cache(-this._bounds.width / 2, -this._bounds.height, this._bounds.width, this._bounds.height);
        }
    });

    this.isOutOfScreen = function () {
        // @todo Fill me in!
        var height = MAP_HEIGHT;
        var width = MAP_WIDTH;
        var offset = 50;

        return (this.pos.x > width + offset ||
                this.pos.y > height + offset ||
                this.pos.x < -offset ||
                this.pos.y < -offset);
    };

    this.gotoAndPlay = function (state) {
        if (this._currentSpriteState !== state) {
            this.sprite.gotoAndPlay(state);
            this._currentSpriteState = state;
        }
    };

    this.setFilter = function (name, filter) {
        filter.name = name;
        this.removeFilter(name);
        this.sprite.filters.push(filter);
    };

    this.removeFilter = function (name) {
        this.sprite.filters.forEach((filter, index) => {
            if (filter.name === name) {
                this.sprite.filters.splice(index, 1);
            }
        });
    };

    this.onAnimationEnd = function (animationNames, callback) {
        var that = this;
        this.sprite.addEventListener("animationend", function (event) {
            for (var i = 0; i < animationNames.length; i++) {
                if (event.name === animationNames[i]) {
                    callback.apply(that);
                }
            }
        });
    };

    this.blink = function () {
        var i = 15;
        this.sprite.on("tick", (e) => {
            var m = 1 - i * 0.1;
            var p = i * 255 / 10;

            this.setFilter("blink", new createjs.ColorFilter(m, m, m, 1, p, 0, 0, 0));

            if (i <= 0) {
                this.removeFilter("blink");
                this.sprite.uncache();
                e.remove();
            }
            i--;
        });
    };

    this.greyOut = function () {
        var matrix = new createjs.ColorMatrix().adjustSaturation(-128);
        var filter = new createjs.ColorMatrixFilter(matrix);
        this.setFilter("greyed", filter);
    };
};
