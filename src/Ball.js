var entities = entities || {};

entities.Ball = new entities.Entity({
    sprite: {
        images: [resources.ballImage],
        frames: {
            width: 8,
            height: 8,
            regX: 4,
            regY: 8
        }
    },
    physical: {
        friction: 2,
        mass: 1,
        dampFactor: 0.6,
        inputForce: 100 //@todo this hacks around the fact that there is no good way of adding a force on construction to a Physical (like when the player makes a Ball to throw), so we use Physical.addInputForce for now
    },
    collidable: {
        callback: function (collision, entity) {
            if (!entity instanceof entities.Player) {
                var vector = new Vector(-1000 * collision.overlapV.x, -1000 * collision.overlapV.y, 2000);
                this.force.add(vector);
            } else {
                world.removeEntity(this);
            }
        },
        hitAreaRadius: 8
    },
    shadow: {
        width: 8 * 2,
        height: 8 * 2
    }
});
