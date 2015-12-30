var mixins = mixins || {};

mixins.Positionable = function (position) {
    if (!this.isInitializable || !this.isUpdateable) {
        throw "Dependencies not met";
    }
    this.isPositionable = true;


    this.pos = initialPosition();
    this.nextPos = this.pos.clone();

    this.onUpdate(function () {
        this.pos = this.nextPos.clone();
    });

    function initialPosition() {
        if (position !== undefined) {
            return new bombit.Vector(position.x, position.y, position.z);
        } else {
            return new bombit.Vector();
        }
    }
};
