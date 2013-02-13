(function (window) {
    var mobs = [];
    var stage = null;

    //@todo Singletonize!
    function World(canvas) {
        if(!this instanceof arguments.callee) throw new Error("Constructor called as a function");

        stage = new createjs.Stage(canvas);
    }

    World.prototype = {
        tick: function(dt) {
            stage.update({
                keyboardState: this.keyboardState,
                dt: dt
            });
        },
        start: function() {
            createjs.Ticker.addListener(this);
            createjs.Ticker.useRAF = true;
            createjs.Ticker.setFPS(30);
        },
        initPlayers: function() {
            var p1keyMap = {
                up: KEY_UP,
                down: KEY_DOWN,
                left: KEY_LEFT,
                right: KEY_RIGHT
            }

            this.player1 = new Player(TILE_WIDTH/2, TILE_HEIGHT/2, resources['player1'], p1keyMap);
            //this.player2 = new Player(TILE_WIDTH/2 + 200, TILE_HEIGHT/2, resources['player1'], keyMap);

            stage.addChild(this.player1.displayObject);
            //stage.addChild(this.player2.displayObject);
        },
        initMobs: function(numMobs) {

        },
        initLevel: function() {
            var x = 0,
                y = 50,
                numBlocksX = 9,
                numBlocksY = 6;

            for(var i = 0; i < numBlocksX; i++) {
                x = TILE_WIDTH * 1.5 + i * TILE_WIDTH * 2;
                for(var j = 0; j < numBlocksY; j++) {
                    y = STATUS_BAR_HEIGHT + TILE_HEIGHT * 1.5 + j * TILE_HEIGHT * 2;
                    var block = new Block(x, y);
                    stage.addChild(block.displayObject);
                }
            }
        },
        registerKeyEvents: function() {
            this.keyboardState = {};
            var that = this;
            document.onkeydown = function(e) {
                that.keyboardState[e.keyCode] = true;
            };

            document.onkeyup = function(e) {
                delete that.keyboardState[e.keyCode];
            };
        }

    }

    window.World = World;
} (window));
