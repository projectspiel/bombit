var entities = entities || {};

var FRAME_WIDTH = 48,
    FRAME_HEIGHT =  96;

entities.Zombie = new Entity({
    spriteSheetData: {
        images: [resources.playerImage],
        frames: {
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            regX: FRAME_WIDTH / 2,
            regY: 88
        },
        animations: {
            idle: [0, 4, true, 0.1],
            moveDown: [8, 11, true, 0.2],
            moveLeft: [16, 23, true, 0.3],
            moveRight: [24, 31, true, 0.3],
            moveUp: [32, 35, true, 0.2]
        }
    },
    physical: {
        friction: 20,
        mass: 1,
        inputForce: 3500
    },
    collidable: {
        callback: function(intersection) {
            this.nextPos.x -= intersection.overlapV.x;
            this.nextPos.y -= intersection.overlapV.y;
        },
        hitAreaRadius: 36
    },
    shadow: {
        width: FRAME_WIDTH * 1.1,
        height:  FRAME_HEIGHT
    }
});
