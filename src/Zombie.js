var entities = entities || {};

var FRAME_WIDTH = 48,
    FRAME_HEIGHT = 96;

entities.Zombie = new entities.Entity({
    sprite: {
        images: [resources.pibiImage],
        frames: {
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            regX: FRAME_WIDTH / 2,
            regY: 88
        },
        animations: {
            idle: [0, 0, true, 1],
            moveDown: [0, 3, true, 0.2],
            moveLeft: [4, 7, true, 0.3],
            moveRight: [8, 11, true, 0.3],
            moveUp: [12, 15, true, 0.2]
        },
        framerate: 10
    },
    physical: {
        friction: 20,
        mass: 1,
        inputForce: 500
    },
    collidable: {
        collisionCallback: function (collision, entity) {
            if (entity instanceof entities.Dog && this.health > 0) {
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
    this.health = 3;

    this.dogSprite = new createjs.Sprite(new createjs.SpriteSheet({
        images: [resources.dogImage],
        frames: {width: 32, height: 32, regX: 16, regY: 25}
    }));
    this.dogSprite.scaleX = this.dogSprite.scaleY = 2;
    this.dogSprite.y = -40;
    this.setInputSource(new inputSources.EnemyInput(this));
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

entities.Zombie.prototype.takeDamage = function() {
    if(this.health > 0) {
        this.health--;
    }
};
