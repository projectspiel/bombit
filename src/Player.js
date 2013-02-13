const MOVEMENT_FORCE = 5000;

(function (window) {
    function Player(x, y, spriteImg, keyMap) {
        this.keyMap = keyMap;
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.force = new Vector(0, 0);
        this.mass = 1;

        this.displayObject = new createjs.BitmapAnimation();
        this.displayObject.regX = TILE_WIDTH / 2 | 0;
        this.displayObject.regY = TILE_HEIGHT / 2 | 0;

        // The onTick handler has to be set here and not in a protoype method (like init) so that the closure has access to the Player instance
        var that = this;
        this.displayObject.onTick = function (data) {
            that.force.reset();
            that.checkInput(data.keyboardState);

            var friction = that.vel.clone().scalar(-20);
            that.force.add(friction);

            that.move(data.dt);
        };

        this.activeStateHandler = this.stateHandlers.idle;
        this.init(spriteImg);
    }

    Player.prototype.impulseVectors = {
        up: new Vector(0, -MOVEMENT_FORCE),
        down: new Vector(0, MOVEMENT_FORCE),
        left: new Vector(-MOVEMENT_FORCE, 0),
        right: new Vector(MOVEMENT_FORCE, 0)
    };

    Player.prototype.stateHandlers = {
        moving: function () {

        },
        idle: function () {
            this.displayObject.gotoAndPlay("idle");
        },
        dying: function () {

        }
    };

    Player.prototype.checkInput = function (keyboardState) {
        if (keyboardState[this.keyMap.up]) {
            this.force.add(this.impulseVectors.up);
        }

        if (keyboardState[this.keyMap.down]) {
            this.force.add(this.impulseVectors.down);
        }

        if (keyboardState[this.keyMap.left]) {
            this.force.add(this.impulseVectors.left);
        }

        if (keyboardState[this.keyMap.right]) {
            this.force.add(this.impulseVectors.right);
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
                count: 8,
                width: TILE_WIDTH,
                height: TILE_HEIGHT,
                regX: 0,
                regY: 0
            },
            animations: {
                idle: [0, 7, true, 10]
            }
        });
        createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
        this.displayObject.initialize(spriteSheet);

        this.activeStateHandler();
    };

    window.Player = Player;
}(window));