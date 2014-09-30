var inputSources =  inputSources || {};

//@fixme: make consistent with the other inputSource.
inputSources.Keyboard = function(keyMap) {

    var keyboardState = this.buildKeyboardStateObject();

    var impulseVectors = {
        up:    new Vector(0, -1),
        down:  new Vector(0, 1),
        left:  new Vector(-1, 0),
        right: new Vector(1, 0)
    };

    this.getCurrentInputVector = function(dt) {
        var vector = new Vector();

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

inputSources.Keyboard.prototype.buildKeyboardStateObject = function() {
    var obj = {};

    document.onkeydown = function (e) {
        obj[e.keyCode] = true;
    };

    document.onkeyup = function (e) {
        delete obj[e.keyCode];
    };

    return obj;
};
