var inputSources = inputSources || {};

inputSources.DogInput = function (entity) {
    var state = "wander",
        that = this,
        wanderInput = new inputSources.WanderInput(entity, {minWait: 30, maxWait: 200, range: 200}),
        stateHandlers = {
            wander: function () {
                return wanderInput.getCurrentInput();
            },
            getBall: function () {
                var ball = that.findBall();
                return {
                    force: entity.pos.vectorTo(ball.pos).normalize()
                };
            },
            returnBall: function () {
                var player = that.findPlayer();
                if (entity.pos.distanceTo(player.pos) < 100) {
                    return { action: inputSources.DogInput.actions.dropBall };
                }
                return { force: entity.pos.vectorTo(player.pos).normalize() };
            }
        };

    this.getCurrentInput = function () {
        this.updateState();
        return stateHandlers[state]();
    };

    this.findBall = function () {
        return world.findEntityByType("ball");
    };

    this.findPlayer = function () {
        return world.findEntityByType("player");
    };

    this.updateState = function () {
        if (state !== "returnBall" && entity.hasBall) {
            this.setState("returnBall");
        }

        if (state === "returnBall" && !entity.hasBall) {
            this.setState("wander");
        }

        if (state === "wander") {
            var ball = this.findBall();
            if (ball && ball.vel.modulo() > 1) {
                that.setState("getBall");
            }
        }

        if (state === "getBall") {
            if (!this.findBall()) {
                that.setState("wander");
            }
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
};

inputSources.DogInput.actions = {
    dropBall: "dropBall"
};
