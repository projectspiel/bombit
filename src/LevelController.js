var LevelController = function (config) {
    "use strict";

    if (!config.stage || !config.addEntityCallback || !config.removeEntityCallback || !config.gameOverCallback) {
        log("LevelController config not properly set");
    }

    var currentWave = 0,
        currentWaveZombieCount,
        currentWaveTickArray = [];

    config.stage.addChild(Score.getDisplayObject());

    return {
        start: function () {
            currentWave = 0;

            nextWave();
            createjs.Sound.play("menuSound");
        },
        tick: tick
    };

    function generateZombie () {
        var position = randomStartupPosition(),
            zombie = new (randomZombie())({
                position: position
            });

        zombie.onDie(() => {
            currentWaveZombieCount--;
            if (currentWaveZombieCount === 0) {
                nextWave();
            }
        });

        zombie.onUpdate(() => {
            if (!zombie.isOutOfScreen()) {
                return;
            }

            if (zombie.hasDog) {
                gameOver();
            } else if (zombie.isDead) {
                config.removeEntityCallback(zombie);
            }
        });

        return zombie;
    }

    function randomStartupPosition () {
        var startUpPositions = [
            { x: getRandomInt(0, MAP_WIDTH), y: -20 },
            { x: MAP_WIDTH + 20, y: getRandomInt(0, MAP_HEIGHT) },
            { x: getRandomInt(0, MAP_WIDTH), y: MAP_HEIGHT + 200 },
            { x: -20, y: getRandomInt(0, MAP_HEIGHT) }
        ];

        return startUpPositions[getRandomInt(0, 4)];
    }

    function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getZombieCount () {
        return currentWave * 2;
    }

    function tick (event) {
        if (event.paused) {
            return;
        }

        for (var i = 0; i < currentWaveTickArray.length; i++) {
            currentWaveTickArray[i]--;

            if (currentWaveTickArray[i] <= 0) {
                config.addEntityCallback(generateZombie());
                currentWaveTickArray.shift();
            }
        }
    }

    function nextWave () {
        Score.increment();
        currentWave++;
        currentWaveZombieCount = getZombieCount();
        currentWaveTickArray = generateTickArray(currentWaveZombieCount);
    }

    function generateTickArray (count) {
        var res = [];
        for (var i = 0; i < count; i++) {
            res.push(Math.floor(Math.random() * 149));
        }
        return res;
    }

    function gameOver () {
        var zombie = null;
        while (zombie = world.findEntityByType('zombie')) {
            config.removeEntityCallback(zombie);
        }

        config.gameOverCallback();
    }

    function randomZombie () {
        return (Math.random() > 0.5) ? entities.zombieOzzo : entities.zombiePibi;
    }

};
