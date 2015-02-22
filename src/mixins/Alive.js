var mixins = mixins || {};

mixins.Alive = function (options) {
    var MOVEMENT_FORCE = 5000,
        callback = options.callback;

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
        var forceToApply = this._inputSource.getCurrentInputVector();

        this.updateSpriteState(forceToApply);
        this.addInputForce(forceToApply);

        callback.call(this, this._inputSource.getCurrentAction());
    };

    this.onInit(function () {
        this._inputSource = this._inputSource || new inputSources.Null();
    });

    this.onSimulate(this._applyInput);
};
