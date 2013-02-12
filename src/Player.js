const MOVEMENT_FORCE = 50;

(function (window) {
    function Player(x, y, spriteImg, keyMap) {
        this.displayObject = new createjs.BitmapAnimation();
        this.displayObject.regX = TILE_WIDTH / 2 | 0;
        this.displayObject.regY = TILE_HEIGHT / 2 | 0;
        this.displayObject.x = x;
        this.displayObject.y = y;

        this.keyMap = keyMap;
        //Vectors
        this.pos = new Vector(x, y);
        this.movement = new Vector(0, 0);
        this.vel = new Vector(0, 0);

        this.force = new Vector(0, 0);

        this.activeStateHandler = this.stateHandlers.idle;
        this.init(spriteImg);

        // The onTick hander has to be set here so that the closure has access to the Player instance
        var that = this;
        this.displayObject.onTick = function() {
            that.tick();
        };
    }

    Player.prototype.tick = function (e) {
        //@todo doThePhysics()
        this.displayObject.x = this.pos.x;
        this.displayObject.y = this.pos.y;
    }

    Player.prototype.movementVectors = {};
    Player.prototype.movementVectors[KEY_UP] = new Vector(0, -MOVEMENT_FORCE);
    Player.prototype.movementVectors[KEY_DOWN] = new Vector(0, MOVEMENT_FORCE);
    Player.prototype.movementVectors[KEY_LEFT] = new Vector(MOVEMENT_FORCE, 0);
    Player.prototype.movementVectors[KEY_RIGHT] = new Vector(-MOVEMENT_FORCE, 0);

    Player.prototype.stateHandlers = {
        moving : function () {

        },
        idle : function () {
            this.displayObject.gotoAndPlay("idle");
        },
        dying : function () {

        }
    };

    Player.prototype.init = function (spriteImg) {
        var spriteSheet = new createjs.SpriteSheet({
            images : [spriteImg],
            frames : {
                count : 8,
                width : TILE_WIDTH,
                height : TILE_HEIGHT,
                regX : 0,
                regY : 0
            },
            animations : {
                idle : [0, 7, true, 10]
            }
        });
        createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);
        this.displayObject.initialize(spriteSheet);

        this.activeStateHandler();
    };

    Player.prototype.handleKeyDown = function (e) {
        if (vector = this.movementVectors[e.keyCode]) {
            this.movement.add(vector);
            this.pos.x += 10;
        }
    };

    Player.prototype.handleKeyUp = function (e) {
        if (vector = this.movementVectors[e.keyCode]) {
            this.movement.substract(vector);
            this.pos.y += 50;
        }
    };

    window.Player = Player;
}(window));