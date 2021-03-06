var entities = entities || {};

entities.Dog = new entities.Entity({
    sprite: {
        images: [resources.dogImage],
        frames: {
            width: 48,
            height: 48,
            regX: 24,
            regY: 33
        },
        animations: {
            idle: [0, 3, true, 0.1],
            moveDown: [4, 7, true, 1],
            moveLeft: [8, 11, true, 1],
            moveRight: [12, 15, true, 1],
            moveUp: [16, 19, true, 1],
            moveDownWithBall: [20, 23, true, 1],
            moveLeftWithBall: [24, 27, true, 1],
            moveRightWithBall: [28, 31, true, 1],
            moveUpWithBall: [16, 19, true, 1]
        },
        framerate: 5
    },
    physical: {
        forceMultiplier: 4000
    },
    collidable: {
        collisionCallback: function (collision, entity) {
            if (entity instanceof entities.Ball) {
                this.catchBall();
                world.removeEntity(entity);
            }

            this.nextPos.x -= collision.overlapV.x;
            this.nextPos.y -= collision.overlapV.y;
        },
        hitAreaRadius: 24
    },
    shadow: {
        width: 32 * 1.1,
        height: 32 * 1.5
    }
});

entities.Dog.prototype.onInit(function () {
    this.hasBall = false;

    this.ballSprite = new createjs.Sprite(new createjs.SpriteSheet({
        images: [resources.ballImage],
        frames: {width: 8, height: 8, regX: 4, regY: 8}
    }));
    this.ballSprite.scaleX = this.ballSprite.scaleY = 2;
    this.ballSprite.y = -16;
    this.setInputSource(new inputSources.DogInput(this));
    this.animationController = new DogAnimationController(this);
});

entities.Dog.prototype.catchBall = function () {
    if (this.hasBall) {
        return;
    }

    this.addDisplayObject(this.ballSprite);
    this.hasBall = true;
};

entities.Dog.prototype.dropBall = function () {
    if (!this.hasBall) {
        return;
    }

    var ball = new entities.Ball({
        position: {
            x: this.pos.x,
            y: this.pos.y + 50
        }
    });
    world.addEntity(ball);

    this.removeDisplayObject(this.ballSprite);
    this.hasBall = false;
};

entities.Dog.prototype.destructor = function () {
    this.dropBall();
};
