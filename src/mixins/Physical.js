var mixins = mixins || {};

mixins.Physical = function() {
    if (!this.isInitializable || !this.isPositionable) { throw "Dependencies not met"; }
    this.isPhysical = true;

    this.onInit( function() {
        this.vel = Object.build(Vector);
        this.force = Object.build(Vector);
        if (this.mass === undefined) {
            this.mass = 1;
        }
    });

    this.move = function(dt) { //@todo split in applyForce and move?
        var halfDeltaVel = this.force.clone().scalar(1 / this.mass * dt / 1000 * 0.5);
        this.vel.add(halfDeltaVel);
        this.pos.add(this.vel.clone().scalar(dt / 1000));
        this.vel.add(halfDeltaVel);
    };

    this.applyGravity = function() {
        var gravity = Object.build(Vector);
        gravity.set(0, 0, -9.8 * 50);
        this.force.add(gravity);
    };
};