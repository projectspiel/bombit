(function (window) {
    function Block(x, y) {
        this.displayObject = new createjs.Bitmap();
        this.displayObject.regX = TILE_WIDTH / 2 | 0;
        this.displayObject.regY = TILE_HEIGHT / 2 | 0;
        this.x = this.displayObject.x = x;
        this.y = this.displayObject.y = y;

        this.init(resources['block']);
    }

    Block.prototype.init = function (spriteImg) {
        this.displayObject.initialize(spriteImg);
    };

    window.Block = Block;
}(window));
