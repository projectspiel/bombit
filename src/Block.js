(function (window) {
    function Block(x, y) {
        this.regX = this.frameWidth / 2 | 0;
        this.regY = this.frameHeight / 2 | 0;
        this.x = x;
        this.y = y;

        this.__proto__ = new createjs.Bitmap(resources['block']);
    }
    //Block.prototype = new createjs.Bitmap(resources['block']);

    window.Block = Block;
} (window));