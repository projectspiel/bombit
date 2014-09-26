var entities = entities || {};

entities.Dog = function(x, y) {
    this.init();
    this.initPosition(x, y);

    this.onUpdate(function (dt) {
        this.render();
    });
};

entities.Dog.includeMixin( mixins.Initializable );
entities.Dog.includeMixin( mixins.Updateable );
entities.Dog.includeMixin( mixins.Simulable );
entities.Dog.includeMixin( mixins.Positionable );
entities.Dog.includeMixin( mixins.Renderable );

entities.Dog.includeMixin( mixins.Sprite, {
    images: [resources.dogImage],
    frames: {
        width: 32,
        height: 32,
        regX: 16,
        regY: 25
    },
    animations: {
        idle: [0, 3, true, 0.05]
    }
});

entities.Dog.includeMixin( mixins.Alive );
entities.Dog.includeMixin( mixins.Physical, 1 );

entities.Dog.includeMixin( mixins.Collidable, {
    callback: function(intersection) {
        return;
    },
    hitAreaRadius: 36
});

entities.Dog.includeMixin( mixins.HasShadow,  32 * 1.1, 32 * 1.5 );
entities.Dog.includeMixin( mixins.Debuggable );
