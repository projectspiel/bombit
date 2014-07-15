var mixins = mixins || {};

mixins.Physical = function() {
    if (this.isPhysical === true) { return; }
    this.isPhysical = true;

    mixins.Initializable.call(this);
    mixins.Positionable.call(this);

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

};
