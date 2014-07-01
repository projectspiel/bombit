function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

Vector.prototype = {
    set: function (x1, y1) {
        this.x = x1;
        this.y = y1;
    },
    reset: function () {
        this.set(0, 0);
    },
    clone: function () {
        return Object.build(Vector, this.x, this.y);
    },
    add: function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    },
    substract: function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    },
    scalar: function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    },
    normalize: function () {
        var aux = this.x * this.x + this.y * this.y;
        if (Math.abs(aux - 1.0) > 0.0001 && aux > 0) {	// Don't normalize if it's not needed
            var magnitude = Math.sqrt(aux);
            this.x /= magnitude;
            this.y /= magnitude;
        }
        return this;
    },
    vectorTo: function (v) {
        return v.clone().substract(this).normalize();
    },
    modulo: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    distance: function (v) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    },
    toString: function () {
        return "(" + this.x + ", " + this.y + ")";
    }
};