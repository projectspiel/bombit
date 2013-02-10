(function (window) {
    var mobs = [];
    var stage = null;

    //@todo Singletonize!
    function World(canvas) {
        if(!this instanceof arguments.callee) throw new Error("Constructor called as a function");

        stage = new createjs.Stage(canvas);
    }

    World.prototype = {
        tick: function() {
            stage.update();
        },
        start: function() {
            createjs.Ticker.addListener(this);
            createjs.Ticker.useRAF = true;
            createjs.Ticker.setFPS(60);
        },
        initPlayers: function() {
            var player1 = new Player(0, 0, resources['player1']);
            stage.addChild(player1.displayObject);
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
                    stage.addChild(block.displayObject);
                }
            }
        }
    }

    window.World = World;
} (window));