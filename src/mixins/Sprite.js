var mixins = mixins || {};

mixins.Sprite = function(spriteSheetData) {
    if (!this.isInitializable || !this.isRenderable) { throw "Dependencies not met"; }
    if (this.isSprite === true) { return; }
    this.isSprite = true;

    this.onInit( function() {
        this.sprite = new createjs.Sprite(new createjs.SpriteSheet(spriteSheetData));
        this.sprite.scaleX = this.sprite.scaleY = 2;
        this.addDisplayObject(this.sprite);
        this._currentSpriteState = 'idle';
    });

    //@TODO Make private after removing all uses
    this.gotoAndPlay = function(state) {
        if( this._currentSpriteState != state) {
            this.sprite.gotoAndPlay(state);
            this._currentSpriteState = state;
        }
    };

    this.updateSpriteState = function(inputVector) {
        if (inputVector.modulo() === 0) {
            this.gotoAndPlay('idle');
        }
        else if (Math.abs(inputVector.x) > Math.abs(inputVector.y)) {
            if (inputVector.x > 0) { this.gotoAndPlay('moveRight'); }
            else                   { this.gotoAndPlay('moveLeft');  }
        }
        else if (inputVector.y > 0) { this.gotoAndPlay('moveDown'); }
        else                        { this.gotoAndPlay('moveUp');  }
    };
};
