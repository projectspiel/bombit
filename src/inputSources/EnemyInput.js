var inputSources = inputSources || {};

inputSources.EnemyInput = function (globalStatus) {
    var state = "getDog",
        dog = null,
        stateHandler = {
            escape: function () {
                //@OPTIMIZE by caching the vector
                return vectorToClosestEdge();
            },
            getDog: function () {
                if (!dog) {
                    dog = world.findEntityByType(entities.Dog);
                }

                if (nearDog()) {
                    state = "escape";
                    return stateHandler[state]();
                } else {
                    return vectorToDog();
                }
            }
        },
        vectorsToEdge = {
            left: new Vector(-1, 0),
            top: new Vector(0, -1),
            right: new Vector(1, 0),
            bottom: new Vector(0, 1)
        },
        that = this;

    function vectorToDog() {
        return that.entity.pos.vectorTo(dog.pos).normalize();
    }

    function distanceToDog() {
        return that.entity.pos.distanceTo(dog.pos);
    }

    function nearDog() {
        return (distanceToDog() < 75);
    }

    function vectorToClosestEdge() {
        var pos = that.entity.pos,
            width = globalStatus.dimensions.width,
            height = globalStatus.dimensions.height,
            distances = {
                left: pos.x - 0,
                top: pos.y - 0,
                right: width - pos.x,
                bottom: height - pos.y
            };

        //@fixme should we use lowdash instead?
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

    this.getCurrentAction = function () {
        return null;
    };

    this.getCurrentInputVector = function (dt) {
        return stateHandler[state]();
    };

    this.setEntity = function (entity) {
        this.entity = entity;
    };
};
