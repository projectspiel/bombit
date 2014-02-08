var mixins = mixins || {};

mixins.Sprite = function() {
    if (!this.isPositionable) {
        throw "Entity needs to be Positionable";
    }

    this.render = function() {
        this.displayObject.x = this.pos.x;
        this.displayObject.y = this.pos.y;
    };

    this.getDisplayObject = function() {
        return this.displayObject;
    }

    this.requires = function() {
        //Positionable
    };

    this.isSprite = true;
};

mixins.Sprite.init = function(params) {
    this.displayObject = new createjs.Bitmap();
    this.displayObject.regX = params.width / 2 | 0;
    this.displayObject.regY = params.height / 2 | 0;
    this.displayObject.initialize(params.sprite);
};