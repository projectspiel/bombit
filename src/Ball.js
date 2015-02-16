var entities = entities || {};

entities.Ball = new entities.Entity({
    spriteSheetData: {
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
        dampFactor: 0.6
    },
    collidable: {
        callback: function (intersection) {
            var vector = new Vector(-1000 * intersection.overlapV.x, -1000 * intersection.overlapV.y, 2000);
            this.force.add(vector);
        },
        hitAreaRadius: 8
    },
    shadow: {
        width: 8 * 2,
        height: 8 * 2
    }
});
