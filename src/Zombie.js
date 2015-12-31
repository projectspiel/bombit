var entities = entities || {};

var FRAME_WIDTH = 48,
    FRAME_HEIGHT = 96;

entities.zombie = function (spec, my) {
    "use strict";

    my = my || {};

    if (spec.sprite === undefined) {
        throw "zombie(): sprite is cant be undefined";
    }

    var zombie = entities.base(
        {
            sprite: spec.sprite,
            physical: {
                friction: 20,
                mass: 1,
                inputForce: 1000
            },
            collidable: {
                collisionCallback: function (collision, entity) {
                    if (entity.isOfType('dog') && this.health > 0) {
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
            },
            // instance spec
            position: spec.position
        },
        my
    );

    my.declareType('zombie');

    zombie.catchDog = catchDog;
    zombie.dropDog = dropDog;
    zombie.onDie = onDie;
    zombie.die = die;
    zombie.takeDamage = takeDamage;

    init();

    return zombie;

    function init () {
        zombie.hasDog = false;
        zombie.isDead = false;
        zombie.health = 3;
        zombie.onDieCallbacks = [];
        zombie.onDie(zombie.greyOut.bind(zombie));

        zombie.setInputSource(new inputSources.ZombieInput(zombie, [0, 3, 5, 6, 10, 11, 15]));
        zombie.animationController = new ZombieAnimationController(zombie);
    }

    function catchDog () {
        zombie.hasDog = true;
    }

    function dropDog () {
        var dog = entities.dog({
            position: {
                x: zombie.pos.x,
                y: zombie.pos.y + 50
            }
        });
        world.addEntity(dog);
        zombie.hasDog = false;
    }

    function onDie (callback) {
        zombie.onDieCallbacks.push(callback);
    }

    function die () {
        zombie.isDead = true;
        for (var i = 0; i < zombie.onDieCallbacks.length; i++) {
            zombie.onDieCallbacks[i].apply(zombie);
        }
    }

    function takeDamage () {
        if (zombie.health > 0) {
            zombie.health--;
            zombie.blink();

            var hitSounds = ["zombieHitSound1", "zombieHitSound2"];
            createjs.Sound.play(hitSounds[Math.floor(Math.random() * hitSounds.length)]);

            if (zombie.health === 0) {
                zombie.die();
            }
        }
    }
};

entities.zombieOzzo = function(spec, my) {
    my = my || {};

    var zombie = entities.zombie(
        {
            sprite: {
                images: [resources.ozzoImage],
                frames: {
                    width: FRAME_WIDTH,
                    height: FRAME_HEIGHT,
                    regX: FRAME_WIDTH / 2,
                    regY: 88
                },
                animations: {
                    idle: [0, 0, true, 1],
                    moveDown: [0, 3, true, 0.4],
                    moveLeft: [5, 9, true, 0.4],
                    moveRight: [10, 14, true, 0.4],
                    moveUp: [15, 18, true, 0.4],
                    moveDownWithDog: [20, 23, true, 0.4],
                    moveLeftWithDog: [25, 29, true, 0.4],
                    moveRightWithDog: [30, 34, true, 0.4],
                    moveUpWithDog: [35, 38, true, 0.4]
                },
                framerate: 10
            },
            position: spec.position
        },
        my
    );

    my.declareType('zombie_ozzo');

    return zombie;
};

entities.zombiePibi = function(spec, my) {
    my = my || {};

    var zombie = entities.zombie(
        {
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
                    moveDown: [0, 3, true, 0.3],
                    moveLeft: [4, 7, true, 0.3],
                    moveRight: [8, 11, true, 0.3],
                    moveUp: [12, 15, true, 0.3],
                    moveDownWithDog: [16, 19, true, 0.3],
                    moveLeftWithDog: [20, 23, true, 0.3],
                    moveRightWithDog: [24, 27, true, 0.3],
                    moveUpWithDog: [28, 31, true, 0.3]
                },
                framerate: 10
            },
            position: spec.position
        },
        my
    );

    my.declareType('zombie_pibi');

    return zombie;
};
