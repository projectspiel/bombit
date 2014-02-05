function World(canvas) {
    this.stage = new createjs.Stage(canvas);
    this.stage.autoClear = true;

    this.initLevel();
    this.initPlayer();
    this.initMobs(0);
    this.registerKeyEvents();
}

World.prototype = {
    tick: function (event) {
        this.stage.update(event, {
            keyboardState: this.keyboardState,
            dt: event.delta,
            stage: this.stage
        });
    },

    start: function () {
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
        createjs.Ticker.setFPS(30);
    },

    initPlayer: function () {
        var keyMap = {
            up: KEY_UP,
            down: KEY_DOWN,
            left: KEY_LEFT,
            right: KEY_RIGHT
        };

        var player = new Player(TILE_WIDTH / 2, TILE_HEIGHT / 2, resources['player'], keyMap);

        this.stage.addChild(player.displayObject);
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
                var block = new entities.Block(x, y);
                this.stage.addChild(block.displayObject);
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