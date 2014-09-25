var mixins = mixins || {};

mixins.Physical = function(options) {
    this.friction = options.friction;
    this.mass     = options.mass;
    this.dampFactor = options.dampFactor;

    if (!this.isInitializable || !this.isSimulable || !this.isPositionable) { throw "Dependencies not met"; }
    this.isPhysical = true;

    this.onInit(function() {
        this._vel = new Vector();
        this.force = new Vector();
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
        this._vel.add(halfDeltaVel);
        this.nextPos.add(this._vel.clone().scalar(dt / 1000));
        this._vel.add(halfDeltaVel);

        this.force.reset();
    };

    this.applyGravity = function() {
        //@fixme FIX ME!
        var gravity = new Vector();
        gravity.set(0, 0, -9.8 * 50);
        this.force.add(gravity);
    };

    this.applyFriction = function(factor) {
        //@fixme FIX ME!
        if (this.pos.z === 0) {
            var friction = new Vector();
            friction.set(this._vel.x * -factor, this._vel.y * -factor, this._vel.z);
            this.force.add(friction);
        }
    };

    this.checkBounds = function(dampFactor, width, height) {

        if (this.nextPos.z <= 0.05) {
            this._vel.z *= -1 * dampFactor;
            this.nextPos.set(this.nextPos.x, this.nextPos.y, 0);
        }

        if(this.pos.x < 0) {
            this.nextPos.set(0, this.nextPos.y);
            this._vel.set(0, this._vel.y);
        }

        if(this.pos.x > width) {
            this.nextPos.set(width, this.nextPos.y);
            this._vel.set(0, this._vel.y);
        }

        if(this.pos.y < 0) {
            this.nextPos.set(this.nextPos.x, 0);
            this._vel.set(this._vel.x, 0);
        }

        if(this.pos.y > height) {
            this.nextPos.set(this.nextPos.x, height);
            this._vel.set(this._vel.x, 0);
        }
    };
};
