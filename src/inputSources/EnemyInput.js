var inputSources = inputSources || {};

inputSources.EnemyInput = function (entity) {
    var actions = inputSources.EnemyInput.actions,
        state = "getDog",
        stateHandlers = {
            escape: function () {
                return {
                    force: vectorToClosestEdge()
                };
            },
            runAway: function () {
                return {
                    action: entity.hasDog ? 'dropDog' : undefined,
                    force: vectorToClosestEdge()
                };
            },
            getDog: function () {
                return {
                    force: vectorToDog()
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

    this.setState = function (newState) {
        if (stateHandlers[state]) {
            state = newState;
        } else {
            console.log("Unknown state: " + newState);
        }
    };

    this.getCurrentInput = function () {
        updateState(entity);
        return stateHandlers[state]();
    };

    function vectorToDog() {
        var dog = world.findEntityByType(entities.Dog);
        return entity.pos.vectorTo(dog.pos).normalize();
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
        if(state === 'escape' || state === 'getDog') {
            if(entity.health === 0) {
              that.setState('runAway');
            }
        }

        if (state === 'getDog') {
            if (entity.hasDog) {
                that.setState("escape");
            }
        }
    }
};

inputSources.EnemyInput.actions = {
    dropDog: "dropDog"
};
