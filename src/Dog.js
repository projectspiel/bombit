var entities = entities || {};

entities.Dog = function(x, y) {
    var MOVEMENT_FORCE = 5000,
        FRICTION_FORCE = 20;

    this.init();
    this.position(x, y);
    this.render();

    this.currentState = "idle";
    this.gotoAndPlay("idle");

    this.onTick(this.getSpriteDisplayObject(), function (data) {
        this.prevState = this.currentState;

        if (this.currentState !== this.prevState) {
            this.stateChangeHandlers[this.currentState].call(this);
        }

        this.stateHandlers[this.currentState].call(this);

        this.applyFriction(FRICTION_FORCE);
        this.applyGravity();
        this.move(data.dt);
        this.checkBounds(0, MAP_WIDTH, MAP_HEIGHT);

        this.checkCollisions(data.stage);

        this.render();
    });
};

entities.Dog.prototype = {
    stateHandlers: {
        idle: function () {

        },
        gettingOutOfTheWay: function() {
            this.force.add(this.pos.vectorTo(this.targetPos));
            this.force.normalize().scalar(2000);

            var distanceToTarget = this.pos.distance(this.targetPos);
            if (distanceToTarget <= 5) {
                this.currentState = "idle";
                this.isCollidable = true;
            }

        }
    },
    stateChangeHandlers: {
        idle: function () {
            this.gotoAndPlay("idle");
        },
        gettingOutOfTheWay: function() {
            this.targetPos = Object.build(
                Vector,
                this.pos.x + Math.floor(Math.random() * 300)-150,
                this.pos.y + Math.floor(Math.random() * 300)-150
            );
            this.isCollidable = false;
            log(this.pos, this.targetPos);
        }
        /*moving: function (that) {
         var animationName;
         if (Math.abs(that.vel.x) > Math.abs(that.vel.y)) {
         animationName = that.vel.x > 0 ? "moveRight" : "moveLeft";
         } else {
         animationName = that.vel.y > 0 ? "moveDown" : "moveUp";
         }
         that.sprite.gotoAndPlay(animationName);
         }*/
    }
};

mixins.Initializable.call(entities.Dog.prototype);
mixins.Positionable.call(entities.Dog.prototype);
mixins.Renderable.call(entities.Dog.prototype);

mixins.Sprite.call(entities.Dog.prototype, {
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
});

mixins.Physical.call(entities.Dog.prototype, 1);

mixins.Collidable.call(entities.Dog.prototype, {
    callback: function(intersection) {
        this.currentState = "gettingOutOfTheWay";
    },
    boundingBox: Object.build(Vector, 30, 30)
});

mixins.Updateable.call(entities.Dog.prototype);
mixins.HasShadow.call(entities.Dog.prototype, 32 * 1.1, 32 * 1.5);
