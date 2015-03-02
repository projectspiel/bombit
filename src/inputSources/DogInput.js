var inputSources = inputSources || {};

inputSources.DogInput = function () {
    var state = "idle",
        stateHandlers = {
            idle: function () {
                var ball = world.findEntityByType(entities.Ball);
                var player = world.findEntityByType(entities.Player);
                if (ball && player.pos.distanceTo(ball.pos) > 200) {
                    that.setState("getBall");
                }
            },
            getBall: function () {
                var ball = world.findEntityByType(entities.Ball);
                if (ball) {
                    return that.entity.pos.vectorTo(ball.pos).normalize();
                } else {
                    that.setState("idle");
                }
            },
            returnBall: function () {
                var player = world.findEntityByType(entities.Player);
                if (that.entity.pos.distanceTo(player.pos) < 100) {
                    that.entity.dropBall();
                    that.setState("idle");
                    return;
                }

                return that.entity.pos.vectorTo(player.pos).normalize();
            }
        },
        that = this;

    this.getCurrentAction = function () {
        //@todo this should return an action and the code should be in Dog.js... but that would make it complicated for no good reason. Fix framework!
        if (this.entity.hasBall) {
            this.setState("returnBall");
        }
    };

    this.getCurrentInputVector = function (dt) {
        return stateHandlers[state]();
    };

    this.setEntity = function (entity) {
        this.entity = entity;
    };

    this.setState = function (newState) {
        if (stateHandlers[state]) {
            state = newState;
        } else {
            console.log("Unknown state: " + newState);
        }
    };
};
