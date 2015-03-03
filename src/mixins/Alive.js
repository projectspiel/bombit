var mixins = mixins || {};

mixins.Alive = function () {
    var MOVEMENT_FORCE = 5000;

    if (!this.isInitializable || !this.isSimulable || !this.isSprite) {
        throw "Dependencies not met";
    }
    this.isAlive = true;

    this.injectInputSource = function (inputSource) {
        if (typeof inputSource.setEntity === "function") {
            inputSource.setEntity(this);
        }
        this._inputSource = inputSource;
    };

    this._applyInput = function () {
        var input = this._inputSource.getCurrentInput() || {};

        if (input.force instanceof bombit.Vector) {
            this.updateSpriteState(input.force);
            this.addInputForce(input.force);
        }

        if(typeof(input.action) === 'string' && typeof(this[input.action]) === 'function') {
            this[input.action]();
        }
    };

    this.onInit(function () {
        this._inputSource = this._inputSource || new inputSources.Null();
    });

    this.onSimulate(this._applyInput);
};
