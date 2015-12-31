var worldFactory = function (canvas) {
    var stage = new createjs.Stage(canvas),
        _entities = [],
        levelController,
        splash,
        gameOver
        ;

    stage.autoClear = true;

    initLevel();
    initPlayer();
    initDog();
    initBall();
    initSplash();
    initGameOver();

    addTickerListeners();

    return {
        start: start,
        pause: pause,
        resume: resume,
        findEntityByType: findEntityByType,
        removeEntity: removeEntity,
        addEntity: addEntity
    };

    function update (event) {
        if (event.paused) {
            return;
        }

        stage.sortChildren(function (obj1, obj2) {
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

        for (var i = 0; i < _entities.length; i++) {
            _entities[i].update(event.delta);
        }
        stage.update(event, event.delta);
    }

    function simulate (event) {
        if (event.paused) {
            return;
        }

        for (var i = 0; i < _entities.length; i++) {
            _entities[i].simulate(event.delta);
        }
    }

    function start () {
        splash.start().then(() => { startLevel(); });
    }

    function startLevel () {
        levelController.start();
    }

    function addTickerListeners () {
        createjs.Ticker.addEventListener("tick", simulate);
        createjs.Ticker.addEventListener("tick", update);
        createjs.Ticker.addEventListener("tick", levelController.tick);
        createjs.Ticker.setFPS(FRAME_RATE);
    }

    function addEntity (entity) {
        _entities.push(entity);
        stage.addChild(entity.getDisplayObject());
    }

    function removeEntity (entity) {
        for (var i = 0; i < _entities.length; i++) {
            if (_entities[i] === entity) {
                if (typeof entity.destructor === "function") {
                    entity.destructor();
                }

                mixins.Collidable.removeEntity(_entities[i]);
                stage.removeChild(_entities[i].getDisplayObject());
                _entities.splice(i, 1);
                return;
            }
        }
    }

    function initPlayer () {
        var player = entities.player({
            position: {
                x: stage.canvas.width / 2,
                y: stage.canvas.height / 2
            }
        });
        addEntity(player);
    }

    function initLevel () {
        initBackground();

        levelController = new LevelController({
            stage: stage,
            gameOverCallback: () => {
                gameOver.show().then(() => {
                    reset();
                });
            },
            addEntityCallback: (entity) => {
                addEntity(entity);
            },
            removeEntityCallback: (entity) => {
                removeEntity(entity);
            }
        });
    }

    function initDog () {
        var dog = entities.dog({
            position: {
                x: stage.canvas.width / 2 + 200,
                y: stage.canvas.height / 2 + 100
            }
        });
        addEntity(dog);
    }

    function initBall () {
        var ball = entities.ball({
            position: {
                x: stage.canvas.width / 2 - 20,
                y: stage.canvas.height / 2 + 50
            }
        });
        addEntity(ball);
    }

    function initBackground () {
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

        for (var y = -10; y < stage.canvas.height; y += tileSize) {
            for (var x = -10; x < stage.canvas.width; x += tileSize) {
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

                stage.addChild(grass);
            }
        }
    }

    function initSplash () {
        splash = new Splash({ stage: stage });
    }

    function initGameOver () {
        gameOver = new GameOver({ stage: stage });
    }

    function findEntityByType (type) {
        for (var i = 0; i < _entities.length; i++) {
            if (_entities[i].isOfType(type)) {
                return _entities[i];
            }
        }
        return null;
    }

    function reset () {
        initDog();
        start();
    }

    function pause () {
        var pauseMessage = new createjs.Text("Paused", "48px MineCrafter", "#222222");
        pauseMessage.name = "pauseMessage";
        pauseMessage.x = CANVAS_WIDTH / 2 - pauseMessage.getBounds().width / 2;
        pauseMessage.y = CANVAS_HEIGHT / 2 - pauseMessage.getBounds().height / 2;
        pauseMessage.zindex = 1000;
        stage.addChild(pauseMessage);
        stage.update();

        createjs.Ticker.setPaused(true);
    }

    function resume () {
        var pauseMessage = stage.getChildByName("pauseMessage");
        stage.removeChild(pauseMessage);

        createjs.Ticker.setPaused(false);
    }
};
