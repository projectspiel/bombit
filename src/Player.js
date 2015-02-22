var entities = entities || {},
    FRAME_WIDTH = 48,
    FRAME_HEIGHT = 96;

entities.Player = new entities.Entity({
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
        mass: 1
    },
    collidable: {
        callback: function (collision, entity) {
            if (entity instanceof entities.Ball && !this.hasBall) {
                this.catchBall();
            }

            this.nextPos.x -= collision.overlapV.x;
            this.nextPos.y -= collision.overlapV.y;
        },
        hitAreaRadius: 36
    },
    shadow: {
        width: FRAME_WIDTH * 1.1,
        height: FRAME_HEIGHT
    },
    alive: {
        callback: function (action) {
            switch (action) {
                case inputSources.PlayerInput.actions.throwBall:
                    if (this.hasBall) {
                        this.throwBall();
                    }
                    break;
                default:
                    break;
            }
        }
    }
});

entities.Player.prototype.onInit(function () {
    this.hasBall = false;
});

entities.Player.prototype.catchBall = function () {
    var spriteSheetData = {
        images: [resources.ballImage],
        frames: {
            width: 8,
            height: 8,
            regX: 4,
            regY: 8
        }
    };

    var ballSprite = new createjs.Sprite(new createjs.SpriteSheet(spriteSheetData));
    ballSprite.scaleX = ballSprite.scaleY = 2;
    this.addDisplayObject(ballSprite);

    this.hasBall = true;
};

entities.Player.prototype.throwBall = function () {
    var normalVel = this.vel.clone().normalize(),
        ball = new entities.Ball({
        position: {
            x: this.pos.x + normalVel.x * 50,
            y: this.pos.y + normalVel.y * 50
        },
        force: {
            x: this.vel.x,
            y: this.vel.y,
            z: 100
        }
    });
    world.addEntity(ball);

    this.hasBall = false;
};
