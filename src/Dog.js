var entities = entities || {};

entities.dog = function (spec, my) {
    "use strict";
    my = my || {};

    var dog = entities.base(
        {
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
                friction: 20,
                mass: 1,
                inputForce: 8000
            },
            collidable: {
                collisionCallback: function (collision, entity) {
                    if (entity.isOfType('ball')) {
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
            },
            // instance spec
            position: spec.position
        },
        my
    );

    dog.catchBall = catchBall;
    dog.dropBall = dropBall;
    dog.destructor = destructor;

    my.declareType('dog');

    initBallSprite();
    dog.hasBall = false;
    dog.setInputSource(new inputSources.DogInput(dog));
    dog.animationController = new DogAnimationController(dog);

    return dog;

    function initBallSprite () {
        dog.ballSprite = new createjs.Sprite(new createjs.SpriteSheet({
            images: [resources.ballImage],
            frames: {width: 8, height: 8, regX: 4, regY: 8}
        }));
        dog.ballSprite.scaleX = dog.ballSprite.scaleY = 2;
        dog.ballSprite.y = -16;
    }

    function catchBall () {
        if (dog.hasBall) {
            return;
        }

        dog.addDisplayObject(dog.ballSprite);
        dog.hasBall = true;
    }

    function dropBall () {
        if (!dog.hasBall) {
            return;
        }

        var ball = entities.ball({
            position: {
                x: dog.pos.x,
                y: dog.pos.y + 50
            }
        });
        world.addEntity(ball);

        dog.removeDisplayObject(dog.ballSprite);
        dog.hasBall = false;
    }

    function destructor () {
        dog.dropBall();
    }
};
