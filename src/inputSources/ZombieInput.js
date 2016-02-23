var inputSources = inputSources || {};

inputSources.ZombieInput = function (entity, stopFrames) {
    if (!entity || !stopFrames) {
        throw "ZombieInput parameter missing.";
    }

    var state = "getDog",
        wanderInput = new inputSources.WanderInput(entity, {minWait: 0, maxWait: 0, range: 150}),
        stateHandlers = {
            wander: () => {
                return {
                    force: wanderInput.getCurrentInput().force.scalar(this.getForceFactor())
                };
            },
            stealDog: () => {
                return {
                    force: vectorToClosestEdge().scalar(this.getForceFactor())
                };
            },
            runAway: () => {
                return {
                    action: entity.hasDog ? "dropDog" : undefined,
                    force: vectorToClosestEdge().scalar(this.getForceFactor())
                };
            },
            getDog: () => {
                return {
                    force: vectorToDog().scalar(this.getForceFactor())
                };
            }
        },
        vectorsToEdge = {
            left: new bombit.Vector(-1, 0),
            top: new bombit.Vector(0, -1),
            right: new bombit.Vector(1, 0),
            bottom: new bombit.Vector(0, 1)
        },
        that = this;

    this.getForceFactor = function () {
        if (stopFrames.indexOf(entity.sprite.currentFrame) >= 0) {
            return 0.01;
        } else {
            return 1;
        }
    };

    this.setState = function (newState) {
        if (newState === "wander") {
            wanderInput.reset();
        }

        if (stateHandlers[state]) {
            state = newState;
        } else {
            console.log("Unknown state: " + newState);
        }
    };

    this.getCurrentInput = function () {
        updateState();
        return stateHandlers[state]();
    };

    function vectorToDog() {
        var dog = findDog();
        return entity.pos.vectorTo(dog.pos).normalize();
    }

    function findDog() {
        return world.findEntityByType(entities.Dog);
    }

    function vectorToClosestEdge() {
        var pos = entity.pos,
            distances = {
                left: pos.x - 0,
                top: pos.y - 0,
                right: MAP_WIDTH - pos.x,
                bottom: MAP_HEIGHT - pos.y
            };

        var minKey;
        for (var key in distances) {
            if (distances.hasOwnProperty(key)) {
                if (minKey === undefined || distances[key] < distances[minKey]) {
                    minKey = key;
                }
            }
        }

        return vectorsToEdge[minKey].clone();
    }

    function updateState() {
        if (state !== "runAway" && entity.health === 0) {
            that.setState("runAway");
        }

        if (state === "getDog") {
            if (entity.hasDog) {
                that.setState("stealDog");
            } else if (!findDog()) {
                that.setState("wander");
            }
        }

        if (state === "wander") {
            if (findDog()) {
                that.setState("getDog");
            }
        }
    }
};

inputSources.ZombieInput.actions = {
    dropDog: "dropDog"
};
