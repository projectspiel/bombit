(function (window) {
    function Player(x, y, spriteSheet) {
        this.displayObject = new createjs.BitmapAnimation(spriteSheet);

        this.displayObject.regX = this.frameWidth / 2 | 0;
        this.displayObject.regY = this.frameHeight / 2 | 0;
        this.displayObject.x = x;
        this.displayObject.y = y;
    }

    Player.prototype.

    window.Player = Player;
} (window));
