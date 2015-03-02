var inputSources = inputSources || {};

inputSources.PlayerInput = function (keyMap) {
    var keyboardState = this.buildKeyboardStateObject(),
        impulseVectors = {
            up: new bombit.Vector(0, -1),
            down: new bombit.Vector(0, 1),
            left: new bombit.Vector(-1, 0),
            right: new bombit.Vector(1, 0)
        };

    this.getCurrentAction = function () {
        if (keyboardState[keyMap.space]) {
            return inputSources.PlayerInput.actions.throwBall;
        }
        return null;
    };

    this.getCurrentInputVector = function () {
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

        return vector.normalize();
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
    throwBall: "throwBall"
};
