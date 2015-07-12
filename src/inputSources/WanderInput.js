var inputSources = inputSources || {};

inputSources.WanderInput = function (entity) {
    var wanderTo = null,
        stepsToWait = 0;

    this.getCurrentInput = function () {
        return (stepsToWait > 0) ? this.wait() : this.wander();
    };

    this.reset = function () {
        wanderTo = null;
        stepsToWait = 0;
    };

    this.wait = function () {
        stepsToWait--;
        return {
            force: new bombit.Vector()
        };
    };

    this.wander = function () {
        if (!wanderTo) {
          wanderTo = this.newWanderToVector();
        }

        if (closeToTarget()) {
            wanderTo = null;
            stepsToWait = this.randomIntegerBetween(30, 100);
            return this.wait();
        } else {
            return { force: entity.pos.vectorTo(wanderTo).normalize().scalar(0.5) };
        }
    };

    this.randomIntegerBetween = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    this.newWanderToVector = function () {
      var vector = entity.pos.clone().add(
          new bombit.Vector(
            this.randomIntegerBetween(-200, 200),
            this.randomIntegerBetween(-200, 200)
          )
      );

      if (pointInsideMap(vector)) {
        return vector;
      }

      return this.newWanderToVector();
    };

    function pointInsideMap(point) {
        return (point.x > 0 && point.x < MAP_WIDTH && point.y > 0 && point.y < MAP_HEIGHT);
    }

    function closeToTarget() {
        if (entity.pos.distanceTo(wanderTo) < 10) {
            return true;
        }
    }
};
