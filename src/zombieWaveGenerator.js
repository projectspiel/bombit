var zombieWaveGenerator = (function() {

    function generateZombie() {
        var position = randomStartupPosition();
        return new entities.Zombie({
            position: position
        });
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

    return {
        new: function(zombieCount, callback) {
          for(var i=0; i<zombieCount; i++) {
              window.setTimeout(function() {
                  callback(generateZombie());
              }, Math.random() * 5000 * zombieCount)
          }
        }
    };
})();
