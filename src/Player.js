var entities = entities || {};

const MOVEMENT_FORCE = 5000;

entities.Player = function(x, y, keyMap) {
    mixins.Positionable.init.call(this, x, y);
    mixins.Physical.init.call(this, 1);
    mixins.Sprite.init.call(this);

    this.currentState = 'idle';
    this.keyMap = keyMap;

    this.getDisplayObject().addEventListener("tick", function (event) {
        var data = event.params[1];
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
    }.bind(this));
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
entities.Player.prototype.impulseVectors = {
    up: new Vector(0, -MOVEMENT_FORCE),
    down: new Vector(0, MOVEMENT_FORCE),
    left: new Vector(-MOVEMENT_FORCE, 0),
    right: new Vector(MOVEMENT_FORCE, 0)
};

entities.Player.prototype.stateHandlers = {
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
};

entities.Player.prototype.stateChangeHandlers = {
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
};

entities.Player.prototype.applyInput = function (keyboardState) {
    this.currentState = 'idle';
    if (keyboardState[this.keyMap.up]) {
        this.force.add(this.impulseVectors.up);
        this.currentState = 'movingUp';
    }

    if (keyboardState[this.keyMap.down]) {
        this.force.add(this.impulseVectors.down);
        this.currentState = 'movingDown';
    }

    if (keyboardState[this.keyMap.left]) {
        this.force.add(this.impulseVectors.left);
        this.currentState = 'movingLeft';
    }

    if (keyboardState[this.keyMap.right]) {
        this.force.add(this.impulseVectors.right);
        this.currentState = 'movingRight';
    }
};

entities.Player.prototype.checkCollisions = function (stage) {
    for(var i = 0 ; i < stage.getNumChildren() ; i++) {
        var entity = stage.getChildAt(i);
        if (entity == this._displayObject) {
            continue; // Don't check against self
        }

        var intersection = ndgmr.checkPixelCollision(this._displayObject, entity, 0, true);
        //var intersection = ndgmr.checkRectCollision(this.displayObject, entity, 0, true);
        if (intersection) {
            if (intersection.width < intersection.height) {
                this.pos.x += (this.pos.x >= intersection.x)? intersection.width : -intersection.width;
            } else {
                this.pos.y += (this.pos.y >= intersection.y)? intersection.height : -intersection.height;
            }
            this.force.reset();
        }
    }
};