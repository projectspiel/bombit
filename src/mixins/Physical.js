var mixins = mixins || {};

mixins.Physical = function(options) {
    this.friction = options.friction;
    this.mass     = options.mass;
    this.dampFactor = options.dampFactor;

    if (!this.isInitializable || !this.isSimulable || !this.isPositionable) { throw "Dependencies not met"; }
    this.isPhysical = true;

    this.onInit(function() {
        this.vel = Object.build(Vector);
        this.force = Object.build(Vector);
        if (this.mass === undefined) {
            this.mass = 1;
        }
    });

    this.onSimulate(function(dt) {
        this.applyFriction(this.friction);
        this.applyGravity();
        this.move(dt);
        this.checkBounds(this.dampFactor, MAP_WIDTH, MAP_HEIGHT);
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

    this.checkBounds = function(dampFactor, width, height) {
        if (this.pos.z <= 0.05) {
            this.vel.z *= -1 * dampFactor;
            this.pos.set(this.pos.x, this.pos.y, 0);
        }

        if(this.pos.x < 0) {
            this.pos.set(0, this.pos.y);
            this.vel.set(0, this.vel.y);
        }

        if(this.pos.x > width) {
            this.pos.set(width, this.pos.y);
            this.vel.set(0, this.vel.y);
        }

        if(this.pos.y < 0) {
            this.pos.set(this.pos.x, 0);
            this.vel.set(this.vel.x, 0);
        }

        if(this.pos.y > height) {
            this.pos.set(this.pos.x, height);
            this.vel.set(this.vel.x, 0);
        }
    };
};
