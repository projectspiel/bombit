var entities = entities || {};

entities.ball = function (spec, my) {
    "use strict";
    my = my || {};

    var ball = entities.base({
        sprite: {
            images: [resources.ballImage],
            frames: {
                width: 6,
                height: 6,
                regX: 3,
                regY: 6
            }
        },
        physical: {
            friction: 10,
            mass: 1,
            dampFactor: 0.6,
            inputForce: 70 //@todo this hacks around the fact that there is no good way of adding a force on construction to a Physical (like when the player makes a Ball to throw), so we use Physical.addInputForce for now
        },
        collidable: {
            collisionCallback: function (collision) {
                var vector = new bombit.Vector(-1000 * collision.overlapV.x, -1000 * collision.overlapV.y, 2000);
                this.force.add(vector);
            },
            boundsCallback: function (side) {
                switch (side) {
                    case "left":
                        this.nextPos.set(0, this.nextPos.y);
                        this.vel.x = this.vel.x * -this.dampFactor;
                        break;
                    case "right":
                        this.nextPos.set(MAP_WIDTH, this.nextPos.y);
                        this.vel.x = this.vel.x * -this.dampFactor;
                        break;
                    case "top":
                        this.nextPos.set(this.nextPos.x, 0);
                        this.vel.y = this.vel.y * -this.dampFactor;
                        break;
                    case "bottom":
                        this.nextPos.set(this.nextPos.x, MAP_HEIGHT);
                        this.vel.y = this.vel.y * -this.dampFactor;
                        break;
                }
            },
            hitAreaRadius: 8
        },
        shadow: {
            width: 6 * 2,
            height: 6 * 2
        },
        // Instance Spec
        position: spec.position,
        force:    spec.force
    }, my);

    my.declareType("ball");

    return ball;
};
