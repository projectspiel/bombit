(function (window) {
    function Player(x, y, spriteImg) {
        this.displayObject = new createjs.BitmapAnimation();
        this.displayObject.regX = TILE_WIDTH / 2 | 0;
        this.displayObject.regY = TILE_HEIGHT / 2 | 0;
        this.x = this.displayObject.x = x;
        this.y = this.displayObject.y = y;

        this.init(spriteImg);
    }

    Player.prototype.init = function(spriteImg) {
        var spriteSheet = new createjs.SpriteSheet({
            images: [spriteImg],
            frames: {
                count: 8,
                width: TILE_WIDTH,
                height:TILE_HEIGHT,
                regX: 0,
                regY: 0
            },
            animations: {
                idle: [0, 7, true, 10]
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);

        this.displayObject.initialize(spriteSheet);

        this.displayObject.gotoAndPlay("idle");
    }

    window.Player = Player;
} (window));
