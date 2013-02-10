(function (window) {
    function Block(x, y) {
        this.displayObject = new createjs.Bitmap();
        this.displayObject.regX = this.frameWidth / 2 | 0;
        this.displayObject.regY = this.frameHeight / 2 | 0;
        this.displayObject.x = x;
        this.displayObject.y = y;

        this.init(resources['block']);

        this.displayObject.rotation = 45;
    }

    Block.prototype.init = function(spriteImg) {
        this.displayObject.initialize(spriteImg);
    }

    window.Block = Block;
} (window));
