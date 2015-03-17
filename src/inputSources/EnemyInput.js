var inputSources = inputSources || {};

inputSources.EnemyInput = function (globalStatus) {
    var state = "getDog",
        stateHandlers = {
            escape: function () {
                return {
                    force: vectorToClosestEdge()
                };
            },
            getDog: function () {
                if (that.entity.hasDog) {
                    that.setState("escape");
                } else {
                    return {
                        force: vectorToDog()
                    };
                }
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

    this.getCurrentInput = function (dt) {
        return stateHandlers[state]();
    };

    this.setEntity = function (entity) {
        this.entity = entity;
    };

    function vectorToDog() {
        var dog = world.findEntityByType(entities.Dog);
        return that.entity.pos.vectorTo(dog.pos).normalize();
    }

    function vectorToClosestEdge() {
        var pos = that.entity.pos,
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
};
