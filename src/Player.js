var entities = entities || {};

var MOVEMENT_FORCE = 5000,
    FRICTION_FORCE = 20,
    MASS = 1,
    FRAME_WIDTH = 48,
    FRAME_HEIGHT =  96;

entities.Player = function(x, y, keyMap, keyboardState) {
    this.init();
    this.position(x, y);
    this.mass = MASS;

    this.render();

    this.currentState = "idle";
    this._keyMap = keyMap;
    this._keyboardState = keyboardState;

    this.onTick(this.getSpriteDisplayObject(), function (data) {
            this.prevState = this.currentState;

            this.applyInput();

            if (this.currentState !== this.prevState) {
                this.stateChangeHandlers[this.currentState].call(this);
            }

            this.stateHandlers[this.currentState].call(this);

            var friction = this.vel.clone().scalar(-FRICTION_FORCE);
            this.force.add(friction);
            this.move(data.dt);
            this.force.reset();

            this.checkCollisions(data.stage);
            this.checkBounds(data.stage);

            this.render();
        }
    );
};

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
            this.gotoAndPlay("moveUp");
        },
        movingDown: function () {
            this.gotoAndPlay("moveDown");
        },
        movingLeft: function () {
            this.gotoAndPlay("moveLeft");
        },
        movingRight: function () {
            this.gotoAndPlay("moveRight");
        },
        idle: function () {
            this.gotoAndPlay("idle");
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
            up: Object.build(Vector, 0, -1),
            down: Object.build(Vector, 0, 1),
            left: Object.build(Vector, -1, 0),
            right: Object.build(Vector, 1, 0)
        };

        this.currentState = "idle";
        if (this._keyboardState[this._keyMap.left]) {
            this.force.add(impulseVectors.left);
            this.currentState = "movingLeft";
        }

        if (this._keyboardState[this._keyMap.right]) {
            this.force.add(impulseVectors.right);
            this.currentState = "movingRight";
        }

        if (this._keyboardState[this._keyMap.up]) {
            this.force.add(impulseVectors.up);
            this.currentState = "movingUp";
        }

        if (this._keyboardState[this._keyMap.down]) {
            this.force.add(impulseVectors.down);
            this.currentState = "movingDown";
        }

        this.force.normalize().scalar(MOVEMENT_FORCE);
    },
    checkBounds: function(stage) {
        if(this.pos.x < 0) {
            this.pos.set(0, this.pos.y);
            this.vel.set(0, this.vel.y);
        }

        if(this.pos.x > stage.canvas.width) {
            this.pos.set(stage.canvas.width, this.pos.y);
            this.vel.set(0, this.vel.y);
        }

        if(this.pos.y < 0) {
            this.pos.set(this.pos.x, 0);
            this.vel.set(this.vel.x, 0);
        }

        if(this.pos.y > stage.canvas.height) {
            this.pos.set(this.pos.x, stage.canvas.height);
            this.vel.set(this.vel.x, 0);
        }
    }
};

mixins.Initializable.call(entities.Player.prototype);
mixins.Positionable.call(entities.Player.prototype);
mixins.Renderable.call(entities.Player.prototype);

mixins.Sprite.call(entities.Player.prototype, {
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
        moveUp: [32, 35, true, 0.2]
    }
});

mixins.Physical.call(entities.Player.prototype, MASS);

mixins.Collidable.call(entities.Player.prototype, {
    callback: function(intersection) {
        if(intersection.width < intersection.height) {
            this.pos.x += (this.pos.x >= intersection.x)? intersection.width : -intersection.width;
            this.vel.set(0, this.vel.y);
        } else {
            this.pos.y += (this.pos.y >= intersection.y)? intersection.height : -intersection.height;
            this.vel.set(this.vel.x, 0);
        }
    },
    boundingBox: Object.build(Vector, 36, 36)
});

mixins.Updateable.call(entities.Player.prototype);
mixins.HasShadow.call(entities.Player.prototype, FRAME_WIDTH * 1.1, FRAME_HEIGHT);


