var LevelController = function (config) {

    if (!config.stage || !config.addEntityCallback || !config.removeEntityCallback || !config.gameOverCallback) {
        log("LevelController config not properly set");
    }

    var currentWave = 0,
        currentWaveZombieCount,
        currentWaveTickArray = [],
        that = this;

    config.stage.addChild(Score.getDisplayObject());

    this.generateZombie = function () {
        var position = this.randomStartupPosition(),
            zombie = new entities.Zombie({
                position: position
            });

        zombie.onDie(() => {
            currentWaveZombieCount--;
            if (currentWaveZombieCount == 0) {
                that.nextWave();
            }
        });

        zombie.onUpdate(() => {
            if (!zombie.isOutOfScreen()) {
                return;
            }

            if (zombie.hasDog) {
                that.gameOver();
            } else if (zombie.isDead) {
                config.removeEntityCallback(zombie);
            }
        });

        return zombie;
    };

    this.randomStartupPosition = function () {
        var startUpPositions = [
            { x: this.getRandomInt(0, MAP_WIDTH), y: -20 },
            { x: MAP_WIDTH + 20, y: this.getRandomInt(0, MAP_HEIGHT) },
            { x: this.getRandomInt(0, MAP_WIDTH), y: MAP_HEIGHT + 200 },
            { x: -20, y: this.getRandomInt(0, MAP_HEIGHT) }
        ];

        return startUpPositions[this.getRandomInt(0, 4)];
    };

    this.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    this.getZombieCount = function () {
        return currentWave * 2;
    };

    this.tick = (event) => {
        if (event.paused) {
            return;
        }

        for (var i = 0; i < currentWaveTickArray.length; i++) {
            currentWaveTickArray[i]--;

            if (currentWaveTickArray[i] <= 0) {
                config.addEntityCallback(this.generateZombie());
                currentWaveTickArray.shift();
            }
        }
    };

    this.nextWave = function () {
        Score.increment();
        currentWave++;
        currentWaveZombieCount = this.getZombieCount();
        currentWaveTickArray = this.generateTickArray(currentWaveZombieCount);
    };

    this.generateTickArray = function (count) {
        var res = [];
        for (var i = 0; i < count; i++) {
            res.push(Math.floor(Math.random() * 149));
        }
        return res;
    };

    this.gameOver = function () {
        var zombie = null;
        while (zombie = world.findEntityByType(entities.Zombie)) {
            config.removeEntityCallback(zombie);
        }

        config.gameOverCallback();
    };

    return {
        start: function () {
            that.currentWave = 0;

            that.nextWave();
            createjs.Sound.play("menuSound");
        },
        tick: this.tick
    };
};
