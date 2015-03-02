var entities = entities || {};

/*
how about not using "new entities.Entity" to make the constructors of the subclasses? (i.e. of Player)
what could be a better functional pattern for this?

can we have mixins declare what their instance constructor functions are, and some compositer that makes the general instance constructor?
seems better than having this thing know about the init procedures for all the mixins it applies

should this really be called EntityMixinApplier?
 */

entities.Entity = function (entitySpec) {
    if (entitySpec.sprite === undefined) {
        throw "sprite can't be undefined";
    }
    if (entitySpec.physical === undefined) {
        throw "physical can't be undefined";
    }

    var entity = function (instanceSpec) {
        //Initializable
        this.init();

        //Positionable
        if (instanceSpec.position !== undefined) {
            this.initPosition(
                instanceSpec.position.x,
                instanceSpec.position.y,
                instanceSpec.position.z
            );
        }

        //Physical
        if (instanceSpec.force !== undefined) {
            this.addInputForce(new bombit.Vector(
                instanceSpec.force.x,
                instanceSpec.force.y,
                instanceSpec.force.z
            ));
        }

        //Alive
        if (instanceSpec.inputSource !== undefined) {
            this.injectInputSource(instanceSpec.inputSource);
        }

        //Updateable
        this.onUpdate(function (dt) {
            this.render();
        });
    };

    entity.includeMixin(mixins.Initializable).
        includeMixin(mixins.Updateable).
        includeMixin(mixins.Simulable).
        includeMixin(mixins.Positionable).
        includeMixin(mixins.Renderable).
        includeMixin(mixins.Sprite, entitySpec.sprite).
        includeMixin(mixins.Physical, entitySpec.physical);

    if (entitySpec.collidable !== undefined) {
        entity.includeMixin(mixins.Collidable, entitySpec.collidable);
    }

    if (entitySpec.shadow !== undefined) {
        entity.includeMixin(mixins.HasShadow, entitySpec.shadow.width, entitySpec.shadow.height);
    }

    if (entitySpec.alive !== undefined) {
        entity.includeMixin(mixins.Alive, entitySpec.alive);
    }

    entity.includeMixin(mixins.Debuggable);

    return entity;
};
