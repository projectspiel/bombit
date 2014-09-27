var mixins = mixins || {};

mixins.Alive = function() {
    if (!this.isInitializable || !this.isSimulable || !this.isSprite) { throw "Dependencies not met"; }
    this.isAlive = true;

    var MOVEMENT_FORCE = 5000;

    /* Public  --------------------  */

    this.buildInputSource = function(inputSourceBuilder, world) {
        this._inputSource = new inputSourceBuilder(this, world);
    };

    /* ----------------------------- */

    this._applyInput = function(dt) {
        var forceToApply = this._inputSource.getCurrentInputVector(dt);

        this.updateSpriteState(forceToApply);
        this.addInputForce(forceToApply);
    };

    this.onInit(function() {
        this._inputSource = this._inputSource || new inputSources.Null();
    });

    this.onSimulate(function(dt) {
        this._applyInput(dt);
    });
};
