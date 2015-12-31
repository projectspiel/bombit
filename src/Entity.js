var entities = entities || {};

entities.base = function (spec, my) {
    my = my || {};

    // Workaround needed since constructors are not being used,
    // hence instanceof is not applicable
    my.declareType = declareType;

    var entity = {
            includeMixin: includeMixin,
            isOfType:     isOfType
        },
        types = [];

    validateSpec();
    declareType("base");

    includeMixin(mixins.Initializable);
    includeMixin(mixins.Updateable);
    includeMixin(mixins.Simulable);
    includeMixin(mixins.Positionable, spec.position);
    includeMixin(mixins.Renderable);
    includeMixin(mixins.Sprite, spec.sprite);
    includeMixin(mixins.Physical, spec.physical);

    //Updateable
    entity.onUpdate(function () {
        this.render();
    });

    if (spec.collidable !== undefined) {
        includeMixin(mixins.Collidable, spec.collidable);
    }

    if (spec.shadow !== undefined) {
        includeMixin(mixins.HasShadow, spec.shadow.width, spec.shadow.height);
    }

    includeMixin(mixins.Alive);
    includeMixin(mixins.Debuggable);

    //Initializable
    entity.init();

    //Physical
    if (spec.force !== undefined) {
        //TODO: move as option of Physical mixin
        entity.addInputForce(new bombit.Vector(
            spec.force.x,
            spec.force.y,
            spec.force.z
        ));
    }

    return entity;

    // ----------- Functions ------------- //

    function validateSpec() {
        if (spec.sprite === undefined) {
            throw "sprite can't be undefined";
        }
        if (spec.physical === undefined) {
            throw "physical can't be undefined";
        }
    }

    function includeMixin(mixin) {
        mixin.apply(entity, Array.prototype.slice.call(arguments, 1));
        return entity;
    }

    function declareType(type) {
        types.push(type);
    }

    function isOfType(type) {
        return _.any(types, function (t) {
            return t === type;
        });
    }

};
