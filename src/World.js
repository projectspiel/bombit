var World = function(canvas) {
    this._stage = new createjs.Stage(canvas);
    this._stage.autoClear = true;
    this._entities = [];

    this.registerKeyEvents();
    this.initLevel();
    this.initMobs(0);
    this.initPlayer();
    this.addDog();
    this.addBlock();
    this.addBall();
};

World.prototype = {
    tick: function (event) {
        this._stage.sortChildren(function(obj1, obj2, options) {
            var obj1zindex = obj1.zindex? obj1.zindex : obj1.y;
            var obj2zindex = obj2.zindex? obj2.zindex : obj2.y;

            if (obj1zindex > obj2zindex) { return 1; }
            if (obj1zindex < obj2zindex) { return -1; }
            return 0;
        });

        this._stage.update(event, {
            dt: event.delta,
            stage: this._stage
        });
    },

    start: function () {
        createjs.Ticker.addEventListener("tick", this.tick.bind(this));
        createjs.Ticker.setFPS(30);
    },

    addEntity: function (entity) {
        this._entities.push(entity);
        this._stage.addChild(entity.getDisplayObject());
    },

    initPlayer: function () {
        var keyMap = { // Defined outside Player because it could be configurable someday
                up: constants.KEY_UP,
                down: constants.KEY_DOWN,
                left: constants.KEY_LEFT,
                right: constants.KEY_RIGHT
            },
            player = Object.build(entities.Player, this._stage.canvas.width / 2, this._stage.canvas.height / 2, keyMap, this.keyboardState);

        this.addEntity(player);
    },

    addDog: function () {
        var dog = Object.build(entities.Dog, this._stage.canvas.width / 2 - 150, this._stage.canvas.height / 2);
        this.addEntity(dog);
    },

    addBlock: function() {
        var block = Object.build(entities.Block, 200, 200);
        this.addEntity(block);
    },

    addBall: function() {
        var ball = Object.build(entities.Ball, 300, 500, 200);
        this.addEntity(ball);
    },

    initMobs: function (numMobs) {

    },

    initLevel: function () {
        var tileSize = 32*2, //@todo because of the creepy scaling
            tileIndex = 0, lastTileIndex = 0,
            grassTiles = [
                resources.grassImage1,
                resources.grassImage2,
                resources.grassImage3,
                resources.grassImage4,
                resources.grassImage5,
                resources.grassImage6
            ];

        for (var y = -10; y < this._stage.canvas.height; y += tileSize) {
            for (var x = -10; x < this._stage.canvas.width; x += tileSize) {
                tileIndex = Math.floor(Math.random()*grassTiles.length);
                if (tileIndex === lastTileIndex) {
                    tileIndex++; // Avoid using the same tile twice in a row
                }
                lastTileIndex = tileIndex;

                var grass = new createjs.Bitmap(grassTiles[tileIndex]);
                grass.x = x;
                grass.y = y;
                grass.scaleX = grass.scaleY = 2;
                grass.zindex = -10;

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
