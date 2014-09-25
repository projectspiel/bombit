var mixins = mixins || {};

mixins.Positionable = function() {
    if (!this.isInitializable || !this.isUpdateable) { throw "Dependencies not met"; }
    this.isPositionable = true;

    this.onInit(function() {
        this.pos = new Vector();
        this.nextPos = this.pos.clone();
    });

    this.initPosition = function(x, y, z) {
        this.nextPos.set(x, y, z);
        this.pos.set(x, y, z);
    };

    this.onUpdate( function() {
        this.pos = this.nextPos.clone();
    });

};
