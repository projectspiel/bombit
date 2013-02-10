(function (window) {
    function Player(x, y, spriteSheet) {
        this.regX = this.frameWidth / 2 | 0;
        this.regY = this.frameHeight / 2 | 0;
        this.x = x;
        this.y = y;

        this.__proto__ = new createjs.Bitmap(spriteSheet);
    }
    //Block.prototype = new createjs.Bitmap(resources['block']);

    Player.prototype = {
        tick: function() {
            stage.update();
        },
        start: function() {
            createjs.Ticker.addListener(this);
            createjs.Ticker.useRAF = true;
            createjs.Ticker.setFPS(60);
        },
        initPlayers: function() {

        },
        initMobs: function(numMobs) {

        },
        initLevel: function() {
            var x = 0,
                y = 50,
                numBlocksX = 9,
                numBlocksY = 6;

            for(var i = 0; i < numBlocksX; i++) {
                x = TILE_WIDTH + i * TILE_WIDTH * 2;
                for(var j = 0; j < numBlocksY; j++) {
                    y = STATUS_BAR_HEIGHT + TILE_HEIGHT + j * TILE_HEIGHT * 2;
                    var block = new Block(x, y);
                    stage.addChild(block);
                }
            }
        }
    }

    window.Player = Player;
} (window));
