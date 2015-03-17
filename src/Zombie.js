var entities = entities || {};

var FRAME_WIDTH = 48,
    FRAME_HEIGHT = 96;

entities.Zombie = new entities.Entity({
    sprite: {
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
        collisionCallback: function (collision, entity) {
            if (entity instanceof entities.Dog) {
                this.catchDog();
                world.removeEntity(entity);
            }

            this.nextPos.x -= collision.overlapV.x;
            this.nextPos.y -= collision.overlapV.y;
        },
        hitAreaRadius: 36
    },
    shadow: {
        width: FRAME_WIDTH * 1.1,
        height: FRAME_HEIGHT
    }
});

entities.Zombie.prototype.onInit(function () {
    this.hasDog = false;

    this.dogSprite = new createjs.Sprite(new createjs.SpriteSheet({
        images: [resources.dogImage],
        frames: {width: 32, height: 32, regX: 16, regY: 25}
    }));
    this.dogSprite.scaleX = this.dogSprite.scaleY = 2;
    this.dogSprite.y = -40;
});

entities.Zombie.prototype.catchDog = function () {
    this.addDisplayObject(this.dogSprite);
    this.hasDog = true;
};

entities.Zombie.prototype.dropDog = function () {
    var dog = new entities.Dog({
        position: {
            x: this.pos.x,
            y: this.pos.y + 50
        }
    });
    world.addEntity(dog);

    this.removeDisplayObject(this.dogSprite);
    this.hasDog = false;
};
