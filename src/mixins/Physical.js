var mixins = mixins || {};

mixins.Physical = function (options) {
    //@fixme use `var` local variables instead of adding attrs to this
    this.friction = options.friction || 20;
    this.mass = options.mass || 1;
    this.dampFactor = options.dampFactor;
    this.forceMultiplier = options.forceMultiplier || 1;

    if (!this.isInitializable || !this.isSimulable || !this.isPositionable) {
        throw "Dependencies not met";
    }

    this.onInit(function () {
        this.vel = new bombit.Vector();
        this.force = new bombit.Vector();

        this.onSimulate(function (dt) {
            this.applyFriction(this.friction);
            this.applyGravity();
            this.move(dt);
            this.checkFloor(this.dampFactor);
        });
    });

    this.move = function (dt) { //@todo split in applyForce and move?
        var halfDeltaVel = this.force.clone().scalar(1 / this.mass * dt / 1000 * 0.5);
        this.vel.add(halfDeltaVel);
        this.nextPos.add(this.vel.clone().scalar(dt / 1000));
        this.vel.add(halfDeltaVel);

        this.force.reset();
    };

    this.applyGravity = function () {
        if (this.vel.z < 0.1 && this.pos.z < 0.1) {
            this.vel.z = 0;
            this.pos.z = 0;
            return;
        }
        var gravity = new bombit.Vector();
        gravity.set(0, 0, -9.8 * 25);
        this.force.add(gravity);
    };

    this.applyFriction = function (factor) {
        if (this.pos.z === 0) {
            var friction = new bombit.Vector();
            friction.set(this.vel.x * -factor, this.vel.y * -factor, this.vel.z);
            this.force.add(friction);
        }
    };

    this.checkFloor = function (dampFactor) {
        if (this.nextPos.z <= 0.05) {
            this.vel.z *= -1 * dampFactor;
            this.nextPos.set(this.nextPos.x, this.nextPos.y, 0);
        }
    };

    this.addForce = function (force) {
        force.scalar(this.forceMultiplier);
        this.force.add(force);
    };

    this.setForceMultiplier = function (forceMultiplier) {
        this.forceMultiplier = forceMultiplier;
    }
};
