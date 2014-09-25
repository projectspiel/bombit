var mixins = mixins || {};

mixins.Alive = function() {
    if (!this.isInitializable || !this.isSimulable || !this.isSprite) { throw "Dependencies not met"; }
    this.isAlive = true;

    var MOVEMENT_FORCE = 5000;

    /* Public  --------------------  */

    this.setInputSource = function(inputSource) {
        this._inputSource = inputSource;
    };

    /* ----------------------------- */

    this._applyInput = function() {
        var forceToApply = this._inputSource.getCurrentInputVector().
                           scalar(MOVEMENT_FORCE);

        this.updateSpriteState(forceToApply);
        this.force.add(forceToApply);
    };

    this.onInit(function() {
        this._inputSource = this._inputSource || new inputSources.Null();
    });

    this.onSimulate(function() {
        this._applyInput();
    });
};
