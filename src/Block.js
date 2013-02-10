(function (window) {
    function Block(x, y) {
        this.displayObject = new createjs.Bitmap(resources['block']);
        this.displayObject.regX = this.frameWidth / 2 | 0;
        this.displayObject.regY = this.frameHeight / 2 | 0;
        this.displayObject.x = x;
        this.displayObject.y = y;
    }

    window.Block = Block;
} (window));
