var LevelController = function (config) {

    if (!config.stage || !config.addEntityCallback || !config.removeEntityCallback || !config.gameOverCallback) {
        log("LevelController config not properly set");
    }

    var currentWave = 0,
        currentWaveZombieCount,
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
                debugger;
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

    this.getZombieCount = function (waveNumber) {
        return waveNumber * 2;
    };

    this.newWave = function () {
        for (var i = 0; i < currentWaveZombieCount; i++) {
            window.setTimeout(function () {
                config.addEntityCallback(that.generateZombie());
            }, Math.random() * 5000 * currentWaveZombieCount)
        }
    };

    this.nextWave = function () {
        Score.increment();
        currentWave++;
        currentWaveZombieCount = this.getZombieCount(currentWave);
        this.newWave();
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
            currentWave = 0;

            that.nextWave();
            createjs.Sound.play("menuSound");
        }
    };
};
