var inputSources =  inputSources || {};

// @notes Instead of returning a movement vector, we should return an object { action: 'pickUpDog', move: vector }
inputSources.Enemy = function(world) {
    var dog = world.entities.dog;
    if (world === undefined) { throw "world is undefined"; }
    if (dog === undefined) { throw "dog is undefined"; }

    // states: getDog, escape, wonder(dog picked up by other zombie)
    var state = 'getDog';

    var stateHandler = {

        escape: function() {
            //@OPTIMIZE by caching the vector
            return vectorToClosestEdge();
        },

        getDog: function() {
            if(nearDog()) {
                state = 'escape';
                return stateHandler[state]();
            }
            else {
                return vectorToDog();
            }
        }
    };

    /* Helpers -------------------- */

    that = this;

    var vectorsToEdge = {
        left:  new Vector(-1, 0),
        top:   new Vector(0, -1),
        right: new Vector(1, 0),
        bottom:  new Vector(0, 1)
    };

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
        var pos = that.entity.pos;
        var width = world.dimensions.width;
        var height = world.dimensions.height;

        var distances = {
            left:  pos.x - 0,
            top:   pos.y - 0,
            right: width - pos.x,
            bottom: height - pos.y
        };

        //@fixme should we use lowdash instead?
        var minKey;
        for (var key in distances) {
          if (distances.hasOwnProperty(key)) {
            if(minKey === undefined || distances[key] < distances[minKey]) {
                minKey = key;
            }
          }
        }

        return vectorsToEdge[minKey].clone();
    }

    /* Public -------------------- */

    this.getCurrentInputVector = function(dt) {
        return stateHandler[state]();
    };

    this.setEntity = function(entity) {
        this.entity = entity;
    };

};
