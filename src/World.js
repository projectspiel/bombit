var World = function(canvas) {
    this._stage = new createjs.Stage(canvas);
    this._stage.autoClear = true;

    this.registerKeyEvents();
    this.initLevel();
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
        var tileSize = 32*2, //@todo because of the creepy scaling
            grassTiles = [
                resources.grassImage1,
                resources.grassImage2,
                resources.grassImage3,
                resources.grassImage4,
                resources.grassImage5,
                resources.grassImage6
            ];

        for (var x = -10; x < this._stage.canvas.width; x += tileSize) {
            for (var y = -10; y < this._stage.canvas.height; y += tileSize) {
                var tileIndex = Math.floor(Math.random()*grassTiles.length);
                var grass = new createjs.Bitmap(grassTiles[tileIndex]);
                grass.x = x;
                grass.y = y;
                grass.scaleX = grass.scaleY = 2;

                this._stage.addChild(grass);
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