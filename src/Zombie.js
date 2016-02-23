var entities = entities || {};

var FRAME_WIDTH = 48,
    FRAME_HEIGHT = 96;

var genericZombieSpec = {
    physical: {
        forceMultiplier: 500
    },
    collidable: {
        collisionCallback: function (collision, entity) {
            if (entity instanceof entities.Dog && this.health > 0) {
                this.catchDog();

                var barkSounds = ["barkSound1", "barkSound2"];
                createjs.Sound.play(barkSounds[Math.floor(Math.random() * barkSounds.length)]);

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
};

var zombieOzzoSpec = _.clone(genericZombieSpec);
zombieOzzoSpec.sprite = {
    images: [resources.ozzoImage],
    frames: {
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        regX: FRAME_WIDTH / 2,
        regY: 88
    },
    animations: {
        idle: [0, 0, true, 1],
        moveDown: [0, 3, true, 0.2],
        moveLeft: [5, 9, true, 0.2],
        moveRight: [10, 14, true, 0.2],
        moveUp: [15, 18, true, 0.2],
        moveDownWithDog: [20, 23, true, 0.2],
        moveLeftWithDog: [25, 29, true, 0.2],
        moveRightWithDog: [30, 34, true, 0.2],
        moveUpWithDog: [35, 38, true, 0.2]
    },
    framerate: 10
};

var zombiePibiSpec = _.clone(genericZombieSpec);
zombiePibiSpec.sprite = {
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
};

entities.ZombieOzzo = new entities.Entity(zombieOzzoSpec);
entities.ZombiePibi = new entities.Entity(zombiePibiSpec);

var zombieOnInit = function () {
    this.hasDog = false;
    this.isDead = false;
    this.health = 3;
    this.onDieCallbacks = [];
    this.onDie(this.greyOut.bind(this));

    this.setInputSource(new inputSources.ZombieInput(this, [0, 3, 5, 6, 10, 11, 15]));
    this.animationController = new ZombieAnimationController(this);
};

entities.ZombieOzzo.prototype.onInit(zombieOnInit);
entities.ZombiePibi.prototype.onInit(zombieOnInit);

entities.ZombieOzzo.prototype.catchDog = entities.ZombiePibi.prototype.catchDog = function () {
    this.hasDog = true;
};

entities.ZombieOzzo.prototype.dropDog = entities.ZombiePibi.prototype.dropDog = function () {
    var dog = new entities.Dog({
        position: {
            x: this.pos.x,
            y: this.pos.y + 50
        }
    });
    world.addEntity(dog);
    this.hasDog = false;
};

entities.ZombieOzzo.prototype.onDie = entities.ZombiePibi.prototype.onDie = function (callback) {
    this.onDieCallbacks.push(callback);
};

entities.ZombieOzzo.prototype.die = entities.ZombiePibi.prototype.die = function () {
    this.isDead = true;
    for (var i = 0; i < this.onDieCallbacks.length; i++) {
        this.onDieCallbacks[i].apply(this);
    }
};

entities.ZombieOzzo.prototype.takeDamage = entities.ZombiePibi.prototype.takeDamage = function () {
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
