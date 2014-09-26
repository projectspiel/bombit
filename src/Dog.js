var entities = entities || {};

entities.Dog = new Entity({
    spriteSheetData: {
        images: [resources.dogImage],
        frames: {
            width: 32,
            height: 32,
            regX: 16,
            regY: 25
        },
        animations: {
            idle: [0, 3, true, 0.05]
        }
    },
    physical: {
        friction: 20,
        mass: 1
    },
    collidable: {
        callback: function(intersection) {
            return;
        },
        hitAreaRadius: 36
    },
    shadow: {
        width: 32 * 1.1,
        height:  32 * 1.5
    }
});
