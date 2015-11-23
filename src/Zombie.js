var entities = entities || {};

var FRAME_WIDTH = 48,
    FRAME_HEIGHT = 96;

entities.Zombie = new entities.Entity({
    sprite: {
        //images: [resources.pibiImage],
        images: [resources.ozzoImage],
        frames: {
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            regX: FRAME_WIDTH / 2,
            regY: 88
        },
        //animations: {
        //    idle: [0, 0, true, 1],
        //    moveDown: [0, 3, true, 0.3],
        //    moveLeft: [4, 7, true, 0.3],
        //    moveRight: [8, 11, true, 0.3],
        //    moveUp: [12, 15, true, 0.3],
        //    moveDownWithDog: [16, 19, true, 0.3],
        //    moveLeftWithDog: [20, 23, true, 0.3],
        //    moveRightWithDog: [24, 27, true, 0.3],
        //    moveUpWithDog: [28, 31, true, 0.3]
        //},
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
    physical: {
        friction: 20,
        mass: 1,
        inputForce: 1000
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
    this.isDead = false;
    this.health = 3;
    this.onDieCallbacks = [];
    this.onDie(this.greyOut.bind(this));

    this.setInputSource(new inputSources.ZombieInput(this, [0, 3, 5, 6, 10, 11, 15]));
    this.animationController = new ZombieAnimationController(this);
});

entities.Zombie.prototype.catchDog = function () {
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
    this.hasDog = false;
};

entities.Zombie.prototype.onDie = function (callback) {
    this.onDieCallbacks.push(callback);
};

entities.Zombie.prototype.die = function () {
    this.isDead = true;
    for (var i = 0; i < this.onDieCallbacks.length; i++) {
        this.onDieCallbacks[i].apply(this);
    }
};

entities.Zombie.prototype.takeDamage = function () {
    if (this.health > 0) {
        this.health--;
        this.blink();

        var hitSounds = ["zombieHitSound1", "zombieHitSound2"];
        createjs.Sound.play(hitSounds[Math.floor(Math.random() * hitSounds.length)]);

        if (this.health === 0) {
            this.die();
        }
    }
};

entities.Zombie.prototype.destructor = function () {
    console.log(this);
};
