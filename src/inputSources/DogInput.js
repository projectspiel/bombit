var inputSources = inputSources || {};

inputSources.DogInput = function (entity) {
    var state = "idle",
        stateHandlers = {
            idle: function () {
                var ball = world.findEntityByType(entities.Ball);
                var player = world.findEntityByType(entities.Player);
                if (ball && ball.vel.modulo() > 1) {
                    that.setState("getBall");
                } else  {
                    return wanderInput.getCurrentInput();
                }
            },
            getBall: function () {
                var ball = world.findEntityByType(entities.Ball);
                if (ball) {
                    return { force: entity.pos.vectorTo(ball.pos).normalize() };
                } else {
                    that.setState("idle");
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
        wanderInput = new inputSources.WanderInput(entity);
        that = this;

    this.getCurrentInput = function () {
        this.updateState();
        return stateHandlers[state]();
    };

    this.updateState = function() {
        if (state !== 'returnBall' && entity.hasBall) {
            this.setState('returnBall');
        }
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
