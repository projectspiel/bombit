var inputSources = inputSources || {};

inputSources.PlayerInput = function (entity, keyMap) {
    var keyboardState = this.buildKeyboardStateObject(),
        actions = inputSources.PlayerInput.actions,
        spaceBarDown = false,
        impulseVectors = {
            up: new bombit.Vector(0, -1),
            down: new bombit.Vector(0, 1),
            left: new bombit.Vector(-1, 0),
            right: new bombit.Vector(1, 0)
        };

    this.getCurrentAction = function () {

        if (keyboardState[keyMap.space] && !spaceBarDown) {
            spaceBarDown = true;
            if (entity.hasBall) {
                return actions.throwBall;
            } else {
                return actions.attack;
            }
        }

        if (!keyboardState[keyMap.space]) {
            spaceBarDown = false;
        }
        return null;
    };

    this.getCurrentInput = function () {
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
            action: this.getCurrentAction()
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

    // If window loses focus while a key is pressed, the keyup event is missed and that input gets stuck.
    // The currentOnFocus thing is a horrible hack to avoid overwriting the previously set onfocus handler used for unpausing.
    // I'm too lazy to do it properly.
    var currentOnFocus = window.onfocus;
    window.onfocus = function() {
        currentOnFocus();
        for(var i in obj) {
            if (obj.hasOwnProperty(i)) {
                delete obj[i];
            }
        }
    };

    return obj;
};

inputSources.PlayerInput.actions = {
    throwBall: "throwBall",
    attack: "attack"
};
