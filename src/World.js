var World = function(canvas) {
    this._stage = new createjs.Stage(canvas);
    this._stage.autoClear = true;

    this.registerKeyEvents();
    this.initLevel();
    this.initMobs(0);
    this.initPlayer();
};

World.prototype = {
    tick: function (event) {
        this._stage.update(event, {
            dt: event.delta,
            stage: this._stage
        });
    },

    start: function () {
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
        createjs.Ticker.setFPS(30);
    },

    initPlayer: function () {
        var keyMap = { // Defined outside Player because it could be configurable someday
            up: KEY_UP,
            down: KEY_DOWN,
            left: KEY_LEFT,
            right: KEY_RIGHT
        },
        player = Object.build(entities.Player, TILE_WIDTH / 2, TILE_HEIGHT / 2, keyMap, this.keyboardState);

        this._stage.addChild(player.getDisplayObject());
    },

    initMobs: function (numMobs) {

    },

    initLevel: function () {
        var x = 0,
            y = 50,
            numBlocksX = 9,
            numBlocksY = 6;

        for (var i = 0; i < numBlocksX; i++) {
            x = TILE_WIDTH * 1.5 + i * TILE_WIDTH * 2;
            for (var j = 0; j < numBlocksY; j++) {
                y = STATUS_BAR_HEIGHT + TILE_HEIGHT * 1.5 + j * TILE_HEIGHT * 2;
                var block = Object.build(entities.Block, x, y);
                this._stage.addChild(block.getDisplayObject());
            }
        }
    },

    registerKeyEvents: function () {
        this.keyboardState = {};

        document.onkeydown = function (e) {
            this.keyboardState[e.keyCode] = true;
        }.bind(this);

        document.onkeyup = function (e) {
            delete this.keyboardState[e.keyCode];
        }.bind(this);
    }
};