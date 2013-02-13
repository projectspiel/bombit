(function (window) {
    function Mob(mobName, imgMob, x_end) {
        this.initialize(mobName, imgMob, x_end);
    }

    Mob.prototype = new createjs.BitmapAnimation();

    // public properties:
    Mob.prototype.bounds = 0; //visual radial size
    Mob.prototype.hit = 0;     //average radial disparity

    // constructor:
    Mob.prototype.BitmapAnimation_initialize = Mob.prototype.initialize; //unique to avoid overiding base class

    // variable members to handle the idle state
    // and the time to wait before walking again
    this.isInIdleMode = false;
    this.idleWaitTicker = 0;

    var quaterFrameSize;

    Mob.prototype.initialize = function (MobName, imgMob, x_end) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgMob], //image to use
            frames: {width: 64, height: 64, regX: 32, regY: 32},
            animations: {
                walk: [0, 9, "walk", 4],
                idle: [10, 20, "idle", 4]
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, false, false);

        this.BitmapAnimation_initialize(localSpriteSheet);
        this.x_end = x_end;

        quaterFrameSize = this.spriteSheet.getFrame(0).rect.width / 4;

        // start playing the first sequence:
        this.gotoAndPlay("walk_h");     //animate

        // set up a shadow. Note that shadows are ridiculously expensive. You could display hundreds
        // of animated Mob if you disabled the shadow.
        this.shadow = new createjs.Shadow("#000", 3, 2, 2);

        this.name = MobName;
        // 1 = right & -1 = left
        this.direction = 1;
        // velocity
        this.vX = 1;
        this.vY = 0;
        // starting directly at the first frame of the walk_h sequence
        this.currentFrame = 21;
    }

    Mob.prototype.tick = function () {
        if (!this.isInIdleMode) {
            // Moving the sprite based on the direction & the speed
            this.x += this.vX * this.direction;
            this.y += this.vY * this.direction;

            // Hit testing the screen width, otherwise our sprite would disappear
            if (this.x >= this.x_end - (quaterFrameSize + 1) || this.x < (quaterFrameSize + 1)) {
                this.gotoAndPlay("idle");
                this.idleWaitTicker = this.IDLEWAITTIME;
                this.isInIdleMode = true;
            }
        }
        else {
            this.idleWaitTicker--;

            if (this.idleWaitTicker == 0) {
                this.isInIdleMode = false;

                // Hit testing the screen width, otherwise our sprite would disappear
                if (this.x >= this.x_end - (quaterFrameSize + 1)) {
                    // We've reached the right side of our screen
                    // We need to walk left now to go back to our initial position
                    this.direction = -1;
                    this.gotoAndPlay("walk");
                }

                if (this.x < (quaterFrameSize + 1)) {
                    // We've reached the left side of our screen
                    // We need to walk right now
                    this.direction = 1;
                    this.gotoAndPlay("walk_h");
                }
            }
        }
    }

    Mob.prototype.hitPoint = function (tX, tY) {
        return this.hitRadius(tX, tY, 0);
    }

    Mob.prototype.hitRadius = function (tX, tY, tHit) {
        //early returns speed it up
        if (tX - tHit > this.x + this.hit) {
            return;
        }
        if (tX + tHit < this.x - this.hit) {
            return;
        }
        if (tY - tHit > this.y + this.hit) {
            return;
        }
        if (tY + tHit < this.y - this.hit) {
            return;
        }

        //now do the circle distance test
        return this.hit + tHit > Math.sqrt(Math.pow(Math.abs(this.x - tX), 2) + Math.pow(Math.abs(this.y - tY), 2));
    }

    window.Mob = Mob;
}(window));