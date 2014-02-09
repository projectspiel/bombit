var mixins = mixins || {};

mixins.Physical = function() {
    if (!this.isPositionable) {
        throw "Entity must be Positionable";
    }

    this.move = function(dt) { //@todo split in applyForce and move?
        var halfDeltaVel = this.force.clone().scalar(1 / this.mass * dt / 1000 * 0.5);
        this.vel.add(halfDeltaVel);
        this.pos.add(this.vel.clone().scalar(dt / 1000));
        this.vel.add(halfDeltaVel);
    };

    this.isPhysical = true;
};

mixins.Physical.init = function(mass) {
    this.vel = Object.build(Vector);
    this.force = Object.build(Vector);
    this.mass = mass;
};