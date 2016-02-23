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
            idle: [0, 4, true, 0.03],
            moveDown: [8, 11, true, 0.1],
            moveLeft: [16, 23, true, 0.15],
            moveRight: [24, 31, true, 0.15],
            moveUp: [32, 35, true, 0.1],
            idleWithBall: [40, 44, true, 0.05],
            moveDownWithBall: [48, 51, true, 0.1],
            moveLeftWithBall: [16, 23, true, 0.15], // same frames as moveLeft
            moveRightWithBall: [56, 63, true, 0.15],
            moveUpWithBall: [64, 67, true, 0.1],
            punchDown: [72, 75, true, 0.15],
            punchLeft: [80, 83, true, 0.15],
            punchRight: [88, 91, true, 0.15],
            punchUp: [96, 99, true, 0.15]
        }
    },
    physical: {
        forceMultiplier: 2500
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
    this.isAttacking = false;
    this.attackingDirection = null;

    var keyMap = { // Defined outside Player because it could be configurable someday
            up: constants.KEY_UP,
            down: constants.KEY_DOWN,
            left: constants.KEY_LEFT,
            right: constants.KEY_RIGHT,
            space: constants.KEY_SPACE
        };
    this.setInputSource(new inputSources.PlayerInput(this, keyMap));
    this.animationController = new PlayerAnimationController(this);

    this.onAnimationEnd(["punchDown", "punchLeft", "punchRight", "punchUp"], function () {
        this.stopAttack();
    });

    this.onSimulate(function () {
        if (this.inputVector.direction() !== this.attackingDirection) {
            this.stopAttack();
        }
    })
});

entities.Player.prototype.catchBall = function () {
    this.hasBall = true;
};

entities.Player.prototype.throwBall = function () {
    if (!this.hasBall) {
        return;
    }

    var spawnVel = this.vel.clone().normalize(),
        spawnForce = spawnVel.clone().scalar(15000),
        ball = new entities.Ball({
        position: {
            x: this.pos.x + spawnVel.x * 60,
            y: this.pos.y + spawnVel.y * 60,
            z: 70
        },
        initialForce: {
            x: spawnForce.x,
            y: spawnForce.y,
            z: 5000
        }
    });

    world.addEntity(ball);
    createjs.Sound.play("ballThrowSound");
    this.hasBall = false;
};

entities.Player.prototype.attack = function () {
    if (this.isAttacking) {
      return;
    }
    this.isAttacking = true;
    this.attackingDirection = this.vel.direction() || "down";
    var attackPoint = this.pos.clone().add(this.vel.clone().normalize().scalar(100)),
        entity = mixins.Collidable.getAtPoint(attackPoint);

    if (entity instanceof entities.ZombieOzzo || entity instanceof entities.ZombiePibi) {
        entity.takeDamage();
    }
};

entities.Player.prototype.stopAttack = function () {
    this.isAttacking = false ;
    this.attackingDirection = null;
};
