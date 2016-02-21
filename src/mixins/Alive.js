var mixins = mixins || {};

mixins.Alive = function () {
    if (!this.isInitializable || !this.isSimulable || !this.isSprite) {
        throw "Dependencies not met";
    }

    this.inputVector = null;

    this.setInputSource = function (inputSource) {
        this._inputSource = inputSource;
    };

    this._applyInput = function () {
        var input = this._inputSource.getCurrentInput() || {};

        if (input.force instanceof bombit.Vector) {
            this.addInputForce(input.force);
            this.inputVector = input.force;
        }

        if (typeof(input.action) === "string" && typeof(this[input.action]) === "function") {
            this[input.action]();
        }

        if (this.animationController !== undefined) {
            this.animationController.update(input.force);
        }
    };

    this.onInit(function () {
        this._inputSource = this._inputSource || new inputSources.Null();

        this.onSimulate(this._applyInput);
    });
};
