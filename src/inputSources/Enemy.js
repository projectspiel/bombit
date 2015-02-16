var inputSources = inputSources || {};

inputSources.Enemy = function (world) {
    var dog = world.entities.dog; // @todo should be passed in from outside

    var state = "getDog",
        stateHandler = {
            escape: function () {
                //@OPTIMIZE by caching the vector
                return vectorToClosestEdge();
            },
            getDog: function () {
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
            width = world.dimensions.width,
            height = world.dimensions.height,
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

    this.getCurrentInputVector = function (dt) {
        return stateHandler[state]();
    };

    this.setEntity = function (entity) {
        this.entity = entity;
    };
};
