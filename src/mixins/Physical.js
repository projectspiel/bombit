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

        this.force.reset();
    };

    this.applyGravity = function() {
        //@fixme FIX ME!
        var gravity = Object.build(Vector);
        gravity.set(0, 0, -9.8 * 50);
        this.force.add(gravity);
    };

    this.applyFriction = function(factor) {
        //@fixme FIX ME!
        if (this.pos.z === 0) {
            var friction = Object.build(Vector);
            friction.set(this.vel.x * -factor, this.vel.y * -factor, this.vel.z);
            this.force.add(friction);
        }
    };

    this.checkBounds = function(dampFactor, canvasWidth, canvasHeight) {
        //@fixme FIX ME!
        if (this.pos.z <= 0.05) {
            this.vel.z *= -1 * dampFactor;
            this.pos.set(this.pos.x, this.pos.y, 0);
        }

        if(this.pos.x < 0) {
            this.pos.set(0, this.pos.y);
            this.vel.set(0, this.vel.y);
        }

        if(this.pos.x > canvasWidth) {
            this.pos.set(canvasWidth, this.pos.y);
            this.vel.set(0, this.vel.y);
        }

        if(this.pos.y < 0) {
            this.pos.set(this.pos.x, 0);
            this.vel.set(this.vel.x, 0);
        }

        if(this.pos.y > canvasHeight) {
            this.pos.set(this.pos.x, canvasHeight);
            this.vel.set(this.vel.x, 0);
        }
    };
};