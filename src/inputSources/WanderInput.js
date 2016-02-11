var inputSources = inputSources || {};

inputSources.WanderInput = function (entity, options) {
    var wanderTo = null,
        framesToWait = 0;

    if (typeof options.minWait === "undefined" || typeof options.maxWait === "undefined" || typeof options.range === "undefined") {
        log("WanderInput options not properly set");
    }

    if (typeof options.bufferDistance === "undefined") {
        options.bufferDistance = 0;
    }

    this.getCurrentInput = function () {
        return (framesToWait > 0) ? this.wait() : this.wander();
    };

    this.reset = function () {
        wanderTo = null;
        framesToWait = 0;
    };

    this.wait = function () {
        framesToWait--;
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
            framesToWait = this.getRandomIntegerBetween(options.minWait, options.maxWait);
            return this.getCurrentInput();
        } else {
            return { force: entity.pos.vectorTo(wanderTo).normalize().scalar(0.5) };
        }
    };

    this.getRandomIntegerBetween = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    this.newWanderToVector = function () {
        var vector = entity.pos.clone().add(
            new bombit.Vector(
                this.getRandomIntegerBetween(-options.range, options.range),
                this.getRandomIntegerBetween(-options.range, options.range)
            )
        );

        return pointInsideMap(vector) ? vector : this.newWanderToVector();
    };

    function pointInsideMap(point) {
        return (point.x > options.bufferDistance &&
                point.x < MAP_WIDTH - options.bufferDistance &&
                point.y > options.bufferDistance &&
                point.y < MAP_HEIGHT - options.bufferDistance);
    }

    function closeToTarget() {
        if (entity.pos.distanceTo(wanderTo) < 10) {
            return true;
        }
    }
};
