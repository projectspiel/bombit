var inputSources = inputSources || {};

inputSources.DogInput = function (globalStatus) {
    var state = "idle",
        ball = null,
        stateHandler = {
            idle: function () {
                ball = world.findEntityByType(entities.Ball);
                if (ball) {
                    state = "getBall";
                }
            },
            getBall: function () {
                return that.entity.pos.vectorTo(ball.pos).normalize();
            }
        },
        that = this;

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
