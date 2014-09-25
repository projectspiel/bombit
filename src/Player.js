var entities = entities || {};

var FRAME_WIDTH = 48,
    FRAME_HEIGHT =  96,
    MOVEMENT_FORCE = 5000;

entities.Player = function(x, y, keyMap, keyboardState) {
    this.init();
    this.initPosition(x, y);

    this.render();

    this.currentState = "idle";
    this._keyMap = keyMap;
    this._keyboardState = keyboardState;

    this.prependOnSimulate( function(dt) {
        this.prevState = this.currentState;

        this.applyInput();

        if (this.currentState !== this.prevState) {
            this.stateChangeHandlers[this.currentState].call(this);
        }

        this.stateHandlers[this.currentState].call(this);
    });

    this.onUpdate(function (dt) {
        this.render();
    });
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
    }
};

mixins.Initializable.call(entities.Player.prototype);
mixins.Updateable.call(entities.Player.prototype);
mixins.Simulable.call(entities.Player.prototype);
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

mixins.Physical.call(entities.Player.prototype, { friction: 20, mass: 1 });

mixins.Collidable.call(entities.Player.prototype, {
    callback: function(intersection) {
        this.nextPos.x -= intersection.overlapV.x;
        this.nextPos.y -= intersection.overlapV.y;
    },
    hitAreaRadius: 36
});

mixins.HasShadow.call(entities.Player.prototype, FRAME_WIDTH * 1.1, FRAME_HEIGHT);
mixins.Debuggable.call(entities.Player.prototype);
