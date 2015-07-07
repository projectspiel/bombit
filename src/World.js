var World = function (canvas) {
    this._stage = new createjs.Stage(canvas);
    this._stage.autoClear = true;

    this._entities = [];
    this.initLevel();
    this.initPlayer();
    this.initDog();
    this.addBall(400, 500, 400);
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
        createjs.Ticker.addEventListener("tick", this.simulate.bind(this));
        createjs.Ticker.addEventListener("tick", this.update.bind(this));
        createjs.Ticker.setFPS(30);

        createjs.Sound.play('menuSound');
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
        player = new entities.Player({
            position: {
                x: this._stage.canvas.width / 2,
                y: this._stage.canvas.height / 2
            }
        });

        this.addEntity(player);
    },

    initLevel: function () {
        this.initGround()
        levelController = new LevelController(this._stage);

        var that = this
        levelController.start(function(zombie) {
            that.addEntity(zombie);
        });
    },

    initDog: function () {
        var dog = new entities.Dog({
            position: {
                x: 600,
                y: 800
            }
        });
        this.addEntity(dog);
    },

    addBall: function (x, y, z) {
        var ball = new entities.Ball({position: {x: x, y: y, z: z}});
        this.addEntity(ball);
    },

    initGround: function () {
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

    findEntityByType: function (type) {
        for (var i = 0; i < this._entities.length; i++) {
            if (this._entities[i] instanceof type) {
                return this._entities[i];
            }
        }
    },

    pause: function() {
        var pauseMessage = new createjs.Text("Paused", "48px MineCrafter", "#222222");
        pauseMessage.name = 'pauseMessage';
        pauseMessage.x = CANVAS_WIDTH / 2 - pauseMessage.getBounds().width / 2;
        pauseMessage.y = CANVAS_HEIGHT / 2 - pauseMessage.getBounds().height / 2;
        pauseMessage.zindex = 1000;
        this._stage.addChild(pauseMessage);
        this._stage.update();

        createjs.Ticker.setPaused(true);
    },

    resume: function() {
        var pauseMessage = this._stage.getChildByName('pauseMessage');
        this._stage.removeChild(pauseMessage);

        createjs.Ticker.setPaused(false);
    }
};
