var World = function(canvas) {
    this._stage = new createjs.Stage(canvas);
    this._stage.autoClear = true;

    this.registerKeyEvents();
    //this.initLevel();
    //this.initMobs(0);
    this.initPlayer();
    this.addDog();
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
            up: constants.KEY_UP,
            down: constants.KEY_DOWN,
            left: constants.KEY_LEFT,
            right: constants.KEY_RIGHT
        },
        player = Object.build(entities.Player, this._stage.canvas.width / 2, this._stage.canvas.height / 2, keyMap, this.keyboardState);

        this._stage.addChild(player.getDisplayObject());
    },

    addDog: function () {
        var dog = Object.build(entities.Dog, this._stage.canvas.width / 2 - 150, this._stage.canvas.height / 2);

        this._stage.addChild(dog.getDisplayObject());
    },

    initMobs: function (numMobs) {

    },

    initLevel: function () {
        var x = 0,
            y = 50,
            numBlocksX = 9,
            numBlocksY = 6;

        for (var i = 0; i < numBlocksX; i++) {
            x = constants.TILE_WIDTH * 1.5 + i * constants.TILE_WIDTH * 2;
            for (var j = 0; j < numBlocksY; j++) {
                y = constants.TILE_HEIGHT * 1.5 + j * constants.TILE_HEIGHT * 2;
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