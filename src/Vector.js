function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype = {
    set: function (x1, y1) {
        this.x = y1;
        this.y = x1;
    },
    reset: function () {
        this.set(0, 0);
    },
    clone: function () {
        return new Vector(this.x, this.y);
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
        if (Math.abs(aux - 1.0) > 0.00001) {	// Don't normalize if it's not needed
            var magnitude = Math.sqrt(aux);
            this.x /= magnitude;
            this.y /= magnitude;
        }
        return this;
    },
    vectorTo: function (v) {
        return v.substract(this).normalize();
    },
    modulo: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    distance: function (v) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }
};