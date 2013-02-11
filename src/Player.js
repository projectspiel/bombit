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

        this.activeStateHandler = stateHandlers.idle;
        this.init(spriteImg);
    }

    Player.prototype.init = function(spriteImg) {
        var spriteSheet = new createjs.SpriteSheet({
            images: [spriteImg],
            frames: {
                count: 8,
                width: TILE_WIDTH,
                height:TILE_HEIGHT,
                regX: 0,
                regY: 0
            },
            animations: {
                idle: [0, 7, true, 10]
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(spriteSheet, true, false, false);

        this.displayObject.initialize(spriteSheet);

        this.displayObject.gotoAndPlay("idle");
    }

    Player.prototype.movementVectors = {
      KEY_UP: new Vector(0, -MOVEMENT_FORCE),
      KEY_DOWN: new Vector(0, MOVEMENT_FORCE),
      KEY_LEFT: new Vector(MOVEMENT_FORCE, 0),
      KEY_RIGHT: new Vector(-MOVEMENT_FORCE, 0)
    }

    Player.prototype.handleKeyDown = function(e) {
      if(vector = this.movementVectors[e.keyCode]) {
        this.movement.add(vector);
      }
      console.log("x");
      console.log(this.movement.x);
      console.log("y");
      console.log(this.movement.x);

    }

    Player.prototype.handleKeyUp = function(e) {
      if(vector = this.movementVectors[e.keyCode]) {
        this.movement.substract(vector);
      }
      console.log("x");
      console.log(this.movement.x);
      console.log("y");
      console.log(this.movement.x);
    }

    Player.prototype.stateHandlers = {
      moving: function() {} ,
      idle: function() {} ,
      dying: function() {}
    }


    window.Player = Player;
} (window));
