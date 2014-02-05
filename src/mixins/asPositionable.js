var components = components || {};

components.asPositionable = function() {
    this.position = function(x, y) {
        this.pos.set(x, y);
    };
};

components.asPositionable.init = function(params) {
    this.pos = new Vector(params.x, params.y);
};