var entities = entities || {};

entities.Dog = new entities.Entity({
    sprite: {
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
        callback: function (collision, entity) {
            if (entity instanceof entities.Ball) {
                this.catchBall();
            }

            this.nextPos.x -= collision.overlapV.x;
            this.nextPos.y -= collision.overlapV.y;
        },
        hitAreaRadius: 24
    },
    shadow: {
        width: 32 * 1.1,
        height: 32 * 1.5
    },
    alive: {
        callback: function (action) {}
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
});

entities.Dog.prototype.catchBall = function () {
    this.addDisplayObject(this.ballSprite);
    this.hasBall = true;
};

entities.Dog.prototype.dropBall = function () {
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
