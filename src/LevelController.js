var LevelController = function(stage) {

    var currentWave = 0;
    var newZombieCallback;

    stage.addChild(Score.getDisplayObject());

    function generateZombie() {
        var position = randomStartupPosition();
        var zombie = new entities.Zombie({
            position: position
        });
        zombie.onDie(function() {
            currentWaveZombieCount--;
            if (currentWaveZombieCount == 0) {
                nextWave();
            }
        });
        return zombie;
    }

    function randomStartupPosition() {
        var startUpPositions = [
              { x: getRandomInt(0, MAP_WIDTH), y: -20 },
              { x: MAP_WIDTH + 20,             y: getRandomInt(0, MAP_HEIGHT) },
              { x: getRandomInt(0, MAP_WIDTH), y: MAP_HEIGHT + 200 },
              { x: -20,                        y: getRandomInt(0, MAP_HEIGHT) },
            ];

        return startUpPositions[getRandomInt(0,4)];
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getZombieCount(waveNumber) {
        return waveNumber * 2;
    }

    function newWave(zombieCount) {
        for(var i=0; i<zombieCount; i++) {
            window.setTimeout(function() {
                newZombieCallback(generateZombie());
            }, Math.random() * 0 * zombieCount)
        }
    }

    function nextWave() {
        Score.increment();
        currentWave++;
        currentWaveZombieCount = getZombieCount(currentWave);
        newWave(currentWaveZombieCount);
    }

    return {
        start: function(callback) {
            newZombieCallback = callback;
            nextWave();
        }
    };
};
