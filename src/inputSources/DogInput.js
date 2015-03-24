var inputSources = inputSources || {};

inputSources.DogInput = function (entity) {
    var state = "idle",
        stateHandlers = {
            idle: function () {
                if (entity.hasBall) {
                    that.setState("returnBall");
                } else {
                    var ball = world.findEntityByType(entities.Ball);
                    var player = world.findEntityByType(entities.Player);
                    if (ball && player.pos.distanceTo(ball.pos) > 200) {
                        that.setState("getBall");
                    }
                }
            },
            getBall: function () {
                if (entity.hasBall) {
                    that.setState("returnBall");
                } else {
                    var ball = world.findEntityByType(entities.Ball);
                    if (ball) {
                        return { force: entity.pos.vectorTo(ball.pos).normalize() };
                    } else {
                        that.setState("idle");
                    }
                }
            },
            returnBall: function () {
                var player = world.findEntityByType(entities.Player);
                if (entity.pos.distanceTo(player.pos) < 100) {
                    that.setState("idle");
                    return { action: inputSources.DogInput.actions.dropBall };
                }

                return { force: entity.pos.vectorTo(player.pos).normalize() };
            }
        },
        that = this;

    this.getCurrentInput = function () {
        return stateHandlers[state]();
    };

    this.setState = function (newState) {
        if (stateHandlers[state]) {
            state = newState;
        } else {
            console.log("Unknown state: " + newState);
        }
    };
};

inputSources.DogInput.actions = {
    dropBall: "dropBall"
};
