var LevelController = function (stage) {

    var currentWave = 0,
        newZombieCallback,
        currentWaveZombieCount,
        that = this;

    stage.addChild(Score.getDisplayObject());

    this.generateZombie = function () {
        var position = this.randomStartupPosition(),
            zombie = new entities.Zombie({
                position: position
            });

        zombie.onDie(function () {
            currentWaveZombieCount--;
            if (currentWaveZombieCount == 0) {
                that.nextWave();
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
                newZombieCallback(that.generateZombie());
            }, Math.random() * 5000 * currentWaveZombieCount)
        }
    };

    this.nextWave = function () {
        Score.increment();
        currentWave++;
        currentWaveZombieCount = this.getZombieCount(currentWave);
        this.newWave();
    };

    return {
        start: function (callback) {
            newZombieCallback = callback;
            that.nextWave();
        }
    };
};
