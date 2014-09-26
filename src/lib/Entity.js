var Entity = function(entitySpec) {

    var entity = function(instanceSpec) {
        this.init();

        if(instanceSpec.position !== undefined) {
            this.initPosition(
                instanceSpec.position.x,
                instanceSpec.position.y,
                instanceSpec.position.z
            );
        }

        if(instanceSpec.inputSource !== undefined) {
            this.setInputSource(instanceSpec.inputSource);
        }

        this.onUpdate(function (dt) {
            this.render();
        });
    };

    if (entitySpec.spriteSheetData === undefined) { throw "spriteSheetData cant be undefined"; }
    if (entitySpec.physical === undefined)        { throw "physical cant be undefined"; }

    entity.includeMixin( mixins.Initializable ).
           includeMixin( mixins.Updateable ).
           includeMixin( mixins.Simulable ).
           includeMixin( mixins.Positionable ).
           includeMixin( mixins.Renderable ).
           includeMixin( mixins.Sprite, entitySpec.spriteSheetData ).
           includeMixin( mixins.Alive ).
           includeMixin( mixins.Physical, entitySpec.physical );

    if (entitySpec.collidable !== undefined) {
        entity.includeMixin( mixins.Collidable, entitySpec.collidable );
    }

    if (entitySpec.shadow !== undefined) {
        entity.includeMixin( mixins.HasShadow, entitySpec.shadow.width, entitySpec.shadow.height );
    }

    entity.includeMixin( mixins.Debuggable );

    return entity;
};
