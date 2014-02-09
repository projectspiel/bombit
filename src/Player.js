var entities = entities || {};

var MOVEMENT_FORCE = 5000,
    MASS = 1;

entities.Player = function(x, y, keyMap, keyboardState) {
    mixins.Positionable.init.call(this, x, y);
    mixins.Sprite.init.call(this);
    mixins.Updateable.init.call(this);
    mixins.Physical.init.call(this, MASS);
    mixins.Collidable.init.call(this);

    this.currentState = "idle";
    this._keyMap = keyMap;
    this._keyboardState = keyboardState;
};

/*
@todo Refactor all the state / animation logic. It's awful stuff.
    We only execute the stateHandlers when the state changed from the previous frame. This is so that we don't call gotoAndPlay
    every tick (otherwise animation doesnt work, it rewinds on every tick),
    BUT
    it means that if we go from moving on one direction to another without going through state idle, the animation doesn't switch
    to the correct direction (since state didnt change)
    also, it means we cant do stuff on the stateHandlers that should be done on every frame
 */

entities.Player.prototype = {
    stateHandlers: {
        movingUp: function () {
        },
        movingDown: function () {
        },
        movingLeft: function () {
        },
        movingRight: function () {
        },
        idle: function () {
        }
    },
    stateChangeHandlers: {
        movingUp: function () {
            this._displayObject.gotoAndPlay("moveUp");
        },
        movingDown: function () {
            this._displayObject.gotoAndPlay("moveDown");
        },
        movingLeft: function () {
            this._displayObject.gotoAndPlay("moveLeft");
        },
        movingRight: function () {
            this._displayObject.gotoAndPlay("moveRight");
        },
        idle: function () {
            this._displayObject.gotoAndPlay("idle");
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
    },
    applyInput: function() {
        var impulseVectors = {
            up: Object.build(Vector, 0, -MOVEMENT_FORCE),
            down: Object.build(Vector, 0, MOVEMENT_FORCE),
            left: Object.build(Vector, -MOVEMENT_FORCE, 0),
            right: Object.build(Vector, MOVEMENT_FORCE, 0)
        };

        this.currentState = "idle";
        if (this._keyboardState[this._keyMap.up]) {
            this.force.add(impulseVectors.up);
            this.currentState = "movingUp";
        }

        if (this._keyboardState[this._keyMap.down]) {
            this.force.add(impulseVectors.down);
            this.currentState = "movingDown";
        }

        if (this._keyboardState[this._keyMap.left]) {
            this.force.add(impulseVectors.left);
            this.currentState = "movingLeft";
        }

        if (this._keyboardState[this._keyMap.right]) {
            this.force.add(impulseVectors.right);
            this.currentState = "movingRight";
        }
    }
};

mixins.Positionable.call(entities.Player.prototype);

mixins.Sprite.call(entities.Player.prototype, {
    images: [resources.playerImage],
    frames: {
        width: constants.TILE_WIDTH,
        height: constants.TILE_HEIGHT,
        regX: constants.TILE_WIDTH / 2,
        regY: constants.TILE_HEIGHT / 2
    },
    animations: {
        idle: [0, 4, true, 0.1],
        moveUp: [5, 8, true, 0.2],
        moveDown: [5, 8, true, 0.2],
        moveLeft: [5, 8, true, 0.2],
        moveRight: [5, 8, true, 0.2]
    }
});

mixins.Updateable.call(entities.Player.prototype, function (data) {
    this.prevState = this.currentState;

    this.applyInput();
    this.stateHandlers[this.currentState].call(this);
    if (this.currentState !== this.prevState) {
        this.stateChangeHandlers[this.currentState].call(this);
    }

    var friction = this.vel.clone().scalar(-20);
    this.force.add(friction);
    this.move(data.dt);
    this.force.reset();

    this.checkCollisions(data.stage);

    this.render();
});

mixins.Physical.call(entities.Player.prototype, 1);

mixins.Collidable.call(entities.Player.prototype, function(intersection) {
    if(intersection.width < intersection.height) {
        this.pos.x += (this.pos.x >= intersection.x)? intersection.width : -intersection.width;
        this.vel.set(0, this.vel.y);
    } else {
        this.pos.y += (this.pos.y >= intersection.y)? intersection.height : -intersection.height;
        this.vel.set(this.vel.x, 0);
    }
});