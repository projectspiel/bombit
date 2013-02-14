const MOVEMENT_FORCE = 5000;

(function (window) {
    /*
    @todo Refactor all the state / animation logic. It's awful stuff.
        We only execute the stateHandlers when the state changed from the previous frame. This is so that we don't call gotoAndPlay
        every tick (otherwise animation doesnt work, it rewinds on every tick),
        BUT
        it means that if we go from moving on one direction to another without going through state idle, the animation doesn't switch
        to the correct direction (since state didnt change)
        also, it means we cant do stuff on the stateHandlers that should be done on every frame
     */

    function Player(x, y, spriteImg, keyMap) {
        this.keyMap = keyMap;
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.force = new Vector(0, 0);
        this.mass = 1;

        this.displayObject = new createjs.BitmapAnimation();
        this.displayObject.regX = TILE_WIDTH / 2 | 0;
        this.displayObject.regY = TILE_HEIGHT / 2 | 0;

        var that = this;
        this.displayObject.onTick = function (data) {
            that.prevState = that.currentState;

            that.force.reset();
            that.checkInput(data.keyboardState);

            var friction = that.vel.clone().scalar(-20);
            that.force.add(friction);

            that.move(data.dt);

            if (that.currentState != that.prevState) {
                that.stateHandlers[that.currentState](that);
            }
        };

        this.init(spriteImg);
    }

    Player.prototype.impulseVectors = {
        up: new Vector(0, -MOVEMENT_FORCE),
        down: new Vector(0, MOVEMENT_FORCE),
        left: new Vector(-MOVEMENT_FORCE, 0),
        right: new Vector(MOVEMENT_FORCE, 0)
    };

    Player.prototype.stateHandlers = {
        moving: function (that) {
            var animationName;
            if (Math.abs(that.vel.x) > Math.abs(that.vel.y)) {
                animationName = that.vel.x > 0 ? 'moveRight' : 'moveLeft';
            } else {
                animationName = that.vel.y > 0 ? 'moveDown' : 'moveUp';
            }
            that.displayObject.gotoAndPlay(animationName);
        },
        idle: function (that) {
            that.displayObject.gotoAndPlay("idle");
        },
        dying: function (that) {

        }
    };

    Player.prototype.checkInput = function (keyboardState) {
        this.currentState = 'idle';
        if (keyboardState[this.keyMap.up]) {
            this.force.add(this.impulseVectors.up);
            this.currentState = 'moving';
        }

        if (keyboardState[this.keyMap.down]) {
            this.force.add(this.impulseVectors.down);
            this.currentState = 'moving';
        }

        if (keyboardState[this.keyMap.left]) {
            this.force.add(this.impulseVectors.left);
            this.currentState = 'moving';
        }

        if (keyboardState[this.keyMap.right]) {
            this.force.add(this.impulseVectors.right);
            this.currentState = 'moving';
        }
    }

    Player.prototype.move = function (dt) {
        var halfDeltaVel = this.force.clone().scalar(1 / this.mass * dt / 1000 * 0.5);
        this.vel.add(halfDeltaVel);
        this.pos.add(this.vel.clone().scalar(dt / 1000));
        this.vel.add(halfDeltaVel);

        this.displayObject.x = this.pos.x;
        this.displayObject.y = this.pos.y;
    }

    Player.prototype.init = function (spriteImg) {
        var spriteSheet = new createjs.SpriteSheet({
            images: [spriteImg],
            frames: {
                count: 15   ,
                width: TILE_WIDTH,
                height: TILE_HEIGHT,
                regX: 0,
                regY: 0
            },
            animations: {
                idle: [0, 2, true, 50],
                moveUp: [3, 4, true, 10],
                moveDown: [6, 7, true, 10],
                moveLeft: [9, 10, true, 10],
                moveRight: [12, 13, true, 10]
            }
        });
        createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
        this.displayObject.initialize(spriteSheet);
    };

    window.Player = Player;
}(window));