var entities = entities || {};

var MOVEMENT_FORCE = 5000,
    FRICTION_FORCE = 20,
    MASS = 1;

entities.Dog = function(x, y) {
    mixins.Positionable.init.call(this, x, y);
    mixins.Sprite.init.call(this);
    mixins.Updateable.init.call(this);
    mixins.Physical.init.call(this, MASS);
    mixins.Collidable.init.call(this);

    this.currentState = "idle";
    this.getDisplayObject().gotoAndPlay("idle");
};

entities.Dog.prototype = {
    stateHandlers: {
        idle: function () {

        }
    },
    stateChangeHandlers: {
        idle: function () {
            this.getDisplayObject().gotoAndPlay("idle");
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

mixins.Positionable.call(entities.Dog.prototype);

mixins.Sprite.call(entities.Dog.prototype, {
    images: [resources.dogImage],
    frames: {
        width: 32,
        height: 32,
        regX: 16,
        regY: 16
    },
    animations: {
        idle: [0, 3, true, 0.05]
    }
});

mixins.Physical.call(entities.Dog.prototype, MASS);

mixins.Collidable.call(entities.Dog.prototype, function(intersection) {

});

mixins.Updateable.call(entities.Dog.prototype, function (data) {
    this.prevState = this.currentState;

    this.stateHandlers[this.currentState].call(this);
    if (this.currentState !== this.prevState) {
        this.stateChangeHandlers[this.currentState].call(this);
    }

    var friction = this.vel.clone().scalar(-FRICTION_FORCE);
    this.force.add(friction);
    this.move(data.dt);
    this.force.reset();

    this.checkCollisions(data.stage);

    this.render();
});