var components = components || {};

components.asSprite = function() {
    this.render = function() {
        this.sprite.x = this.pos.x;
        this.sprite.y = this.pos.y;
    };

    this.getSprite = function() {
        return this.sprite;
    }

    this.requires = function() {
        //Positionable
    };
};

components.asSprite.init = function(params) {
    this.sprite = new createjs.Bitmap();
    this.sprite.regX = params.width / 2 | 0;
    this.sprite.regY = params.height / 2 | 0;
    this.sprite.initialize(params.sprite);
};