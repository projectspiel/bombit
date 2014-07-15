var mixins = mixins || {};

mixins.Sprite = function(spriteSheetData) {
    if (!this.isPositionable || !this.isInitializable) {
        throw "Entity must be Positionable and Initializable";
    }

    this.onInit( function() {
        this._displayObject = new createjs.Sprite(this._spriteSheet);
        this._displayObject.scaleX = this._displayObject.scaleY = 2;
        this._referenceDisplayObject = this._createReferenceDisplayObject();

        /**
         * @fixme THIS IS NOT OKAY.
         * Kill once we replace the collision system
         */
        this._displayObject.parentEntity = this;
    });

    this._displayObject = null; //@todo Make actually private
    this._referenceDisplayObject = null
    this._spriteSheet = new createjs.SpriteSheet(spriteSheetData); //@todo Make actually private

    if (this.calcDisplayVector === undefined) {
        this.calcDisplayVector = function() {
            return this.pos;
        }
    }

    this.render = function() {
        var displayVector = this.getDisplayPosition();

        this._displayObject.x = displayVector.x;
        this._displayObject.y = displayVector.y;
        if (this._referenceDisplayObject !== null) {
            this._referenceDisplayObject.x = displayVector.x;
            this._referenceDisplayObject.y = displayVector.y;
        }
    };

    /**
     * @fixme Kill this method and replace with a list of proxy methods
     */
    this.getDisplayObject = function() {
        return this._displayObject;
    };

    this.getReferenceDisplayObject = function() {
        return this._referenceDisplayObject;
    };

    this._createReferenceDisplayObject = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("blue").drawCircle(0, 0, 5);
        return shape;
    };

    this.isSprite = true;
};
