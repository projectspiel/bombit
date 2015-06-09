var bombit = bombit || {};

bombit.Vector = function (x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
};

bombit.Vector.prototype = {
    set: function (x1, y1, z1) {
        this.x = x1;
        this.y = y1;
        if (typeof z1 !== "undefined") {
            this.z = z1;
        }
    },
    reset: function () {
        this.set(0, 0, 0);
    },
    clone: function () {
        return new bombit.Vector(this.x, this.y, this.z);
    },
    add: function (v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    },
    substract: function (v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    },
    scalar: function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    },
    normalize: function () {
        var aux = this.x * this.x + this.y * this.y + this.z * this.z;
        if (Math.abs(aux - 1.0) > 0.0001 && aux > 0) {	// Don't normalize if it's not needed
            var magnitude = Math.sqrt(aux);
            this.x /= magnitude;
            this.y /= magnitude;
            this.z /= magnitude;
        }
        return this;
    },
    vectorTo: function (v) {
        return v.clone().substract(this);
    },
    modulo: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    distanceTo: function (v) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2) + Math.pow(this.z - v.z, 2));
    },
    toString: function () {
        return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    },
    direction: function() {
        if (this.modulo() < 0.1) {
          return null;
        } else if (Math.abs(this.x) > Math.abs(this.y)) {
            if (this.x > 0) {
                return "right";
            } else {
                return "left";
            }
        } else if (this.y > 0) {
            return "down";
        } else {
            return "up";
        }
    }

};
