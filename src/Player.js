var entities = entities || {};

const MOVEMENT_FORCE = 5000;
const MASS = 1;

entities.Player = function(x, y, keyMap) {
    mixins.Positionable.init.call(this, x, y);
    mixins.Sprite.init.call(this);
    mixins.Updateable.init.call(this);
    mixins.Physical.init.call(this, MASS);
    mixins.Collidable.init.call(this);

    this.currentState = 'idle';
    this.keyMap = keyMap;
};

/*++++++++++++++++++++++++++++++++++++++++++++*/
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
        movingUp: function (that) {
        },
        movingDown: function (that) {
        },
        movingLeft: function (that) {
        },
        movingRight: function (that) {
        },
        idle: function (that) {
        }
    },
    stateChangeHandlers: {
        movingUp: function (that) {
            that._displayObject.gotoAndPlay('moveUp');
        },
        movingDown: function (that) {
            that._displayObject.gotoAndPlay('moveDown');
        },
        movingLeft: function (that) {
            that._displayObject.gotoAndPlay('moveLeft');
        },
        movingRight: function (that) {
            that._displayObject.gotoAndPlay('moveRight');
        },
        idle: function (that) {
            that._displayObject.gotoAndPlay("idle");
        }
        /*moving: function (that) {
         var animationName;
         if (Math.abs(that.vel.x) > Math.abs(that.vel.y)) {
         animationName = that.vel.x > 0 ? 'moveRight' : 'moveLeft';
         } else {
         animationName = that.vel.y > 0 ? 'moveDown' : 'moveUp';
         }
         that.sprite.gotoAndPlay(animationName);
         }*/
    },
    applyInput: function (keyboardState) {
        var impulseVectors = {
            up: new Vector(0, -MOVEMENT_FORCE),
            down: new Vector(0, MOVEMENT_FORCE),
            left: new Vector(-MOVEMENT_FORCE, 0),
            right: new Vector(MOVEMENT_FORCE, 0)
        };

        this.currentState = 'idle';
        if (keyboardState[this.keyMap.up]) {
            this.force.add(impulseVectors.up);
            this.currentState = 'movingUp';
        }

        if (keyboardState[this.keyMap.down]) {
            this.force.add(impulseVectors.down);
            this.currentState = 'movingDown';
        }

        if (keyboardState[this.keyMap.left]) {
            this.force.add(impulseVectors.left);
            this.currentState = 'movingLeft';
        }

        if (keyboardState[this.keyMap.right]) {
            this.force.add(impulseVectors.right);
            this.currentState = 'movingRight';
        }
    }
};

mixins.Positionable.apply(entities.Player.prototype);

mixins.Sprite.apply(entities.Player.prototype, [{
    images: [resources['playerImage']],
    frames: {width: TILE_WIDTH, height: TILE_HEIGHT, regX: TILE_WIDTH / 2, regY: TILE_HEIGHT / 2},
    animations: {
        idle: [0, 2, true, 0.02],
        moveUp: [3, 4, true, 0.2],
        moveDown: [6, 7, true, 0.2],
        moveLeft: [9, 10, true, 0.2],
        moveRight: [12, 13, true, 0.2]
    }
}]);

mixins.Physical.apply(entities.Player.prototype, [1]);

mixins.Collidable.apply(entities.Player.prototype, [function(intersection) {
    if (intersection.width < intersection.height) {
        this.pos.x += (this.pos.x >= intersection.x)? intersection.width : -intersection.width;
    } else {
        this.pos.y += (this.pos.y >= intersection.y)? intersection.height : -intersection.height;
    }
    this.force.reset();
}]);

mixins.Updateable.apply(entities.Player.prototype, [function (data) {
    this.prevState = this.currentState;
    this.force.reset();

    var friction = this.vel.clone().scalar(-20);
    this.force.add(friction);

    this.applyInput(data.keyboardState);
    this.stateHandlers[this.currentState](this);
    if (this.currentState != this.prevState) {
        this.stateChangeHandlers[this.currentState](this);
    }

    this.move(data.dt);
    this.checkCollisions(data.stage);

    this.render();
}]);