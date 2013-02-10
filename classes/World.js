(function (window) {
    var mobs = [];
    var stage = null;

    //@todo Singletonize!
    function World(canvas) {
        stage = new createjs.Stage(canvas);
    }

    World.prototype.tick = function() {
        stage.update();
    }

    World.prototype.start = function() {
        createjs.Ticker.addListener(this);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(60);
    }

    World.prototype.initPlayers = function() {

    }

    World.prototype.initMobs = function(numMobs) {

    }

    World.prototype.initLevel = function() {
        var imgTile = new Image();
        imgTile.src = "res/img/BlockA0.png";

        var bmpSeqTile = new createjs.Bitmap(imgTile);
        bmpSeqTile.regX = bmpSeqTile.frameWidth / 2 | 0;
        bmpSeqTile.regY = bmpSeqTile.frameHeight / 2 | 0;

        for (var i = 0; i < 20; i++) {
            var bmpSeqTileCloned = bmpSeqTile.clone();

            // set display properties:
            bmpSeqTileCloned.x = 0 + (i * 40);
            bmpSeqTileCloned.y = 32;

            // add to the display list:
            stage.addChild(bmpSeqTileCloned);
        }
    }

    window.World = World;
} (window));