var mixins = mixins || {};

mixins.Sprite = function(spriteSheetData) {
    if (!this.isInitializable || !this.isPositionable || !this.isRenderable) { throw "Dependencies not met"; }
    if (this.isSprite === true) { return; }
    this.isSprite = true;

    this.onInit( function() {
        this._displayObject = new createjs.Sprite(this._spriteSheet);
        this._displayObject.scaleX = this._displayObject.scaleY = 2;
        this._referenceDisplayObject = this._createReferenceDisplayObject();
        this._collisionBoxDisplayObject = this._createCollisionBoxDisplayObject();

        /**
         * @fixme THIS IS NOT OKAY.
         * Kill once we replace the collision system
         */
        this._displayObject.parentEntity = this;
    });

    this._displayObject = null; //@todo Make actually private
    this._referenceDisplayObject = null
    this._collisionBoxDisplayObject = null
    this._spriteSheet = new createjs.SpriteSheet(spriteSheetData); //@todo Make actually private

    if (this.calcDisplayVector === undefined) {
        this.calcDisplayVector = function() {
            return this.pos;
        }
    }

    this.onRender( function() {
        var displayVector = this.getDisplayPosition();

        this._displayObject.x = displayVector.x;
        this._displayObject.y = displayVector.y;

        if (this._referenceDisplayObject !== null) {
            this._referenceDisplayObject.x = displayVector.x;
            this._referenceDisplayObject.y = displayVector.y;
        }

        if (this._collisionBoxDisplayObject !== null) {
            this._collisionBoxDisplayObject.x = displayVector.x;
            this._collisionBoxDisplayObject.y = displayVector.y;
        }
    });

    // Transforms 2D map position to
    // visual position on the map
    this.getDisplayPosition = function() {
        return this._mapToCanvas( this.pos );
    };

    this._mapToCanvas = function (vector) {
        return Object.build( Vector,
                             vector.x * CANVAS_WIDTH / MAP_WIDTH,
                             vector.y * CANVAS_HEIGHT / MAP_HEIGHT );
    }

    /**
     * @fixme Kill this method and replace with a list of proxy methods
     */
    this.getDisplayObject = function() {
        return this._displayObject;
    };

    this.getReferenceDisplayObject = function() {
        return this._referenceDisplayObject;
    };

    this.getCollisionBoxDisplayObject = function() {
        return this._collisionBoxDisplayObject;
    };

    this._createReferenceDisplayObject = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("blue").drawCircle(0, 0, 5);
        return shape;
    };

    this._createCollisionBoxDisplayObject = function() {
        var shape = new createjs.Shape(),
            vertices = this.getCollisionBoxPolygon().getVertices();

        for( var i=0; i < vertices.length; i++) {
            vertices[i] = this._mapToCanvas(vertices[i]);
        }

        // @fixme Make generic to polygons
        shape.graphics.beginStroke("blue").moveTo(vertices[0].x, vertices[0].y).
                                           lineTo(vertices[1].x, vertices[1].y).
                                           lineTo(vertices[2].x, vertices[2].y).
                                           lineTo(vertices[3].x, vertices[3].y).
                                           lineTo(vertices[0].x, vertices[0].y);
        return shape;
    };

};
