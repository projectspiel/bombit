var World = function (canvas) {
    this._stage = new createjs.Stage(canvas);
    this._stage.autoClear = true;

    this._entities = [];
    this.initLevel();
    this.initPlayer();
    this.initDog();
    this.initBall();
    this.initSplash();
    this.initGameOver();

    this.addTickerListeners();
};

World.prototype = {
    update: function (event) {
        if (event.paused) {
            return;
        }

        this._stage.sortChildren(function (obj1, obj2) {
            var obj1zindex = obj1.zindex ? obj1.zindex : obj1.y;
            var obj2zindex = obj2.zindex ? obj2.zindex : obj2.y;

            if (obj1zindex > obj2zindex) {
                return 1;
            }
            if (obj1zindex < obj2zindex) {
                return -1;
            }
            return 0;
        });

        for (var i = 0; i < this._entities.length; i++) {
            this._entities[i].update(event.delta);
        }
        this._stage.update(event, event.delta);
    },

    simulate: function (event) {
        if (event.paused) {
            return;
        }

        for (var i = 0; i < this._entities.length; i++) {
            this._entities[i].simulate(event.delta);
        }
    },

    start: function () {
        this.splash.start().then(() => { this.startLevel(); });
    },

    startLevel: function () {
        this.levelController.start();
    },

    addTickerListeners: function () {
        createjs.Ticker.addEventListener("tick", this.simulate.bind(this));
        createjs.Ticker.addEventListener("tick", this.update.bind(this));
        createjs.Ticker.addEventListener("tick", this.levelController.tick);
        createjs.Ticker.setFPS(FRAME_RATE);
    },

    addEntity: function (entity) {
        this._entities.push(entity);
        this._stage.addChild(entity.getDisplayObject());
    },

    removeEntity: function (entity) {
        for (var i = 0; i < this._entities.length; i++) {
            if (this._entities[i] === entity) {
                if (typeof entity.destructor === "function") {
                    entity.destructor();
                }

                mixins.Collidable.removeEntity(this._entities[i]);
                this._stage.removeChild(this._entities[i].getDisplayObject());
                this._entities.splice(i, 1);
                return;
            }
        }
    },

    initPlayer: function () {
        var player = new entities.Player({
            position: {
                x: this._stage.canvas.width / 2,
                y: this._stage.canvas.height / 2 + 300
            }
        });
        this.addEntity(player);
    },

    initLevel: function () {
        this.initBackground();

        this.levelController = new LevelController({
            stage: this._stage,
            gameOverCallback: () => {
                this.gameOver.show().then(() => {
                    this.reset();
                })
            },
            addEntityCallback: (entity) => {
                this.addEntity(entity);
            },
            removeEntityCallback: (entity) => {
                this.removeEntity(entity)
            }
        });
    },

    initDog: function () {
        var dog = new entities.Dog({
            position: {
                x: this._stage.canvas.width / 2 + 100,
                y: this._stage.canvas.height / 2 + 300
            }
        });
        this.addEntity(dog);
    },

    initBall: function () {
        var ball = new entities.Ball({
            position: {
                x: this._stage.canvas.width / 2 - 75,
                y: this._stage.canvas.height / 2 + 300
            }
        });
        this.addEntity(ball);
    },

    initBackground: function () {
        var tileSize = 32 * 2, //@todo this is because of the creepy scaling
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
                tileIndex = Math.floor(Math.random() * grassTiles.length);
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

    initSplash: function () {
        this.splash = new Splash({ stage: this._stage });
    },

    initGameOver: function () {
        this.gameOver = new GameOver({ stage: this._stage });
    },

    findEntityByType: function (type) {
        for (var i = 0; i < this._entities.length; i++) {
            if (this._entities[i] instanceof type) {
                return this._entities[i];
            }
        }
        return null;
    },

    reset: function () {
        this.initDog();
        this.start();
    },

    pause: function () {
        var pauseMessage = new createjs.Text("Paused", "48px MineCrafter", "#222222");
        pauseMessage.name = "pauseMessage";
        pauseMessage.x = CANVAS_WIDTH / 2 - pauseMessage.getBounds().width / 2;
        pauseMessage.y = CANVAS_HEIGHT / 2 - pauseMessage.getBounds().height / 2;
        pauseMessage.zindex = 1000;
        this._stage.addChild(pauseMessage);
        this._stage.update();

        createjs.Ticker.setPaused(true);
    },

    resume: function () {
        var pauseMessage = this._stage.getChildByName("pauseMessage");
        this._stage.removeChild(pauseMessage);

        createjs.Ticker.setPaused(false);
    },

    mapToCanvas: function (vector) {
        var newVector = new bombit.Vector(
            vector.x * CANVAS_WIDTH / MAP_WIDTH,
            vector.y * CANVAS_HEIGHT / MAP_HEIGHT
        );

        if (typeof vector.z === "number" && !isNaN(vector.z)) {
            newVector.y -= vector.z;
        }

        return newVector;
    }
};
