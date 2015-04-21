var inputSources = inputSources || {};

inputSources.WanderInput = function(entity) {
    var wanderTo = null,
        stepsToWait = 0;

    this.getCurrentInput = function () {
        return (stepsToWait > 0) ? wait() : wander();
    }

    this.reset = function() {
        wanderTo = null;
        stepsToWait = 0;
    }

    function wait() {
        stepsToWait--;
        return { force: new bombit.Vector() };
    }

    function wander() {
        if(!wanderTo) {
          wanderTo = newWanderToVector();
        }

        if(closeToTarget()) {
            wanderTo = null;
            stepsToWait = randomIntegerBetween(10, 20);
            return wait();
        } else {
            return { force: entity.pos.vectorTo(wanderTo).normalize().scalar(0.5) };
        }
    }

    function randomIntegerBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    function newWanderToVector() {
      var vector = entity.pos.clone().add(
          new bombit.Vector(
            randomIntegerBetween(-200, 200),
            randomIntegerBetween(-200, 200)
          )
      );

      if (pointInsideMap(vector)) {
        return vector;
      }

      return newWanderToVector();
    }

    function pointInsideMap(point) {
        return (point.x > 0 && point.x < MAP_WIDTH && point.y > 0 && point.y < MAP_HEIGHT);
    }

    function closeToTarget() {
        if (entity.pos.distanceTo(wanderTo) < 10) {
            return true;
        }
    }
};
