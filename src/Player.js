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
            moveUp: [32, 35, true, 0.2],
            idleWithBall: [40, 44, true, 0.1],
            moveDownWithBall: [48, 51, true, 0.2],
            moveLeftWithBall: [16, 23, true, 0.3],
            moveRightWithBall: [56, 63, true, 0.3],
            moveUpWithBall: [64, 67, true, 0.2]
        }
    },
    physical: {
        friction: 20,
        mass: 1
    },
    collidable: {
        collisionCallback: function (collision, entity) {
            if (entity instanceof entities.Ball && !this.hasBall) {
                this.catchBall();
                world.removeEntity(entity);
            }

            this.nextPos.x -= collision.overlapV.x;
            this.nextPos.y -= collision.overlapV.y;
        },
        boundsCallback: function (side) {
            switch (side) {
                case "left":
                    this.nextPos.set(0, this.nextPos.y);
                    break;
                case "right":
                    this.nextPos.set(MAP_WIDTH, this.nextPos.y);
                    break;
                case "top":
                    this.nextPos.set(this.nextPos.x, 0);
                    break;
                case "bottom":
                    this.nextPos.set(this.nextPos.x, MAP_HEIGHT);
                    break;
            }
        },
        hitAreaRadius: 36
    },
    shadow: {
        width: FRAME_WIDTH * 1.1,
        height: FRAME_HEIGHT
    }
});

entities.Player.prototype.onInit(function () {
    this.hasBall = false;

    this.ballSprite = new createjs.Sprite(new createjs.SpriteSheet({
        images: [resources.ballImage],
        frames: {width: 8, height: 8, regX: 4, regY: 8}
    }));
    this.ballSprite.scaleX = this.ballSprite.scaleY = 2;
    this.ballSprite.y = -42;
    this.ballSprite.x = 23;
    var keyMap = { // Defined outside Player because it could be configurable someday
            up: constants.KEY_UP,
            down: constants.KEY_DOWN,
            left: constants.KEY_LEFT,
            right: constants.KEY_RIGHT,
            space: constants.KEY_SPACE
        };
    this.setInputSource(new inputSources.PlayerInput(this, keyMap))
    this.animationController = new PlayerAnimationController(this);
});

entities.Player.prototype.catchBall = function () {
    this.addDisplayObject(this.ballSprite);
    this.hasBall = true;
};

entities.Player.prototype.throwBall = function () {
    if (!this.hasBall) { return; }
    var spawnVel = this.vel.clone().normalize().scalar(60),
        ball = new entities.Ball({
        position: {
            x: this.pos.x + spawnVel.x,
            y: this.pos.y + spawnVel.y
        },
        force: {
            x: this.vel.x,
            y: this.vel.y,
            z: 100
        }
    });
    world.addEntity(ball);

    this.removeDisplayObject(this.ballSprite);
    this.hasBall = false;
};

entities.Player.prototype.attack = function () {
    var attackPoint = this.pos.clone().add(this.vel.clone().normalize().scalar(60)),
        entity = mixins.Collidable.getAtPoint(attackPoint);

    if (entity instanceof entities.Zombie) {
        entity.takeDamage();
    }
};
