var entities = entities || {},
    FRAME_WIDTH = 48,
    FRAME_HEIGHT = 96;

entities.player = function (spec, my) {
    my = my || {};

    var player = entities.base(
        {
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
                    moveLeftWithBall: [16, 23, true, 0.3], // same frames as moveLeft
                    moveRightWithBall: [56, 63, true, 0.3],
                    moveUpWithBall: [64, 67, true, 0.2],
                    punchDown: [72, 75, true, 0.3],
                    punchLeft: [80, 83, true, 0.3],
                    punchRight: [88, 91, true, 0.3],
                    punchUp: [96, 99, true, 0.3]
                }
            },
            physical: {
                friction: 20,
                mass: 1
            },
            collidable: {
                collisionCallback: function (collision, entity) {
                    if (entity.isOfType('ball') && !this.hasBall) {
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
            },
            /* Instance Spec */
            position: spec.position,
            force:    spec.force
        },
        my
    );

    my.declareType('player');

    player.catchBall = catchBall;
    player.throwBall = throwBall;
    player.attack = attack;
    player.stopAttack = stopAttack;
    init();

    return player;

    function init() {
        player.hasBall = false;
        player.isAttacking = false;
        player.attackingDirection = null;

        player.ballSprite = new createjs.Sprite(new createjs.SpriteSheet({
            images: [resources.ballImage],
            frames: {width: 8, height: 8, regX: 4, regY: 8}
        }));
        player.ballSprite.scaleX = player.ballSprite.scaleY = 2;
        player.ballSprite.y = -42;
        player.ballSprite.x = 23;
        var keyMap = { // Defined outside Player because it could be configurable someday
            up: constants.KEY_UP,
            down: constants.KEY_DOWN,
            left: constants.KEY_LEFT,
            right: constants.KEY_RIGHT,
            space: constants.KEY_SPACE
        };
        player.setInputSource(new inputSources.PlayerInput(player, keyMap));
        player.animationController = new PlayerAnimationController(player);

        player.onAnimationEnd(["punchDown", "punchLeft", "punchRight", "punchUp"], function () {
            player.stopAttack();
        });

        player.onSimulate(function () {
            if (player.inputVector.direction() !== player.attackingDirection) {
                player.stopAttack();
            }
        });
    }

    function catchBall() {
        player.addDisplayObject(player.ballSprite);
        player.hasBall = true;
    }

    function throwBall () {
        if (!player.hasBall) { return; }
        var spawnVel = player.vel.clone().normalize().scalar(60),
            ball = entities.ball({
                position: {
                    x: player.pos.x + spawnVel.x,
                    y: player.pos.y + spawnVel.y
                },
                force: {
                    x: player.vel.x,
                    y: player.vel.y,
                    z: 100
                }
            });
            world.addEntity(ball);

            createjs.Sound.play("ballThrowSound");

            player.removeDisplayObject(player.ballSprite);
            player.hasBall = false;
    }

    function attack() {
        if (player.isAttacking) {
            return;
        }
        player.isAttacking = true;
        player.attackingDirection = player.vel.direction() || "down";
        var attackPoint = player.pos.clone().add(player.vel.clone().normalize().scalar(60)),
            entity = mixins.Collidable.getAtPoint(attackPoint);

            if (entity && entity.isOfType('zombie')) {
                entity.takeDamage();
            }
    }

    function stopAttack() {
        player.isAttacking = false ;
        player.attackingDirection = null;
    }
};
