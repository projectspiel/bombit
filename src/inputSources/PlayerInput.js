var inputSources = inputSources || {};

inputSources.PlayerInput = function (keyMap) {
    var keyboardState = this.buildKeyboardStateObject(),
        impulseVectors = {
            up: new bombit.Vector(0, -1),
            down: new bombit.Vector(0, 1),
            left: new bombit.Vector(-1, 0),
            right: new bombit.Vector(1, 0)
        };

    this.getCurrentAction = function (entity) {
        if (keyboardState[keyMap.space]) {
            if (entity.hasBall) {
                return inputSources.PlayerInput.actions.throwBall;
            } else {
                return inputSources.PlayerInput.actions.attack;
            }
        }
        return null;
    };

    this.getCurrentInput = function (entity) {
        var vector = new bombit.Vector();

        if (keyboardState[keyMap.left]) {
            vector.add(impulseVectors.left);
        }

        if (keyboardState[keyMap.right]) {
            vector.add(impulseVectors.right);
        }

        if (keyboardState[keyMap.up]) {
            vector.add(impulseVectors.up);
        }

        if (keyboardState[keyMap.down]) {
            vector.add(impulseVectors.down);
        }

        return {
            force: vector.normalize(),
            action: this.getCurrentAction(entity)
        };
    };
};

inputSources.PlayerInput.prototype.buildKeyboardStateObject = function () {
    var obj = {};

    document.onkeydown = function (e) {
        obj[e.keyCode] = true;
    };

    document.onkeyup = function (e) {
        delete obj[e.keyCode];
    };

    return obj;
};

inputSources.PlayerInput.actions = {
    throwBall: "throwBall",
    attack: "attack"
};
