var entities = entities || {};

entities.Dog = function(x, y) {
    this.init();
    this.initPosition(x, y);

    this.onUpdate(function (dt) {
        this.render();
    });
};

mixins.Initializable.call(entities.Dog.prototype);
mixins.Updateable.call(entities.Dog.prototype);
mixins.Simulable.call(entities.Dog.prototype);
mixins.Positionable.call(entities.Dog.prototype);
mixins.Renderable.call(entities.Dog.prototype);

mixins.Sprite.call(entities.Dog.prototype, {
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

mixins.Alive.call(entities.Dog.prototype);
mixins.Physical.call(entities.Dog.prototype, 1);

mixins.Collidable.call(entities.Dog.prototype, {
    callback: function(intersection) {
        return;
    },
    hitAreaRadius: 36
});

mixins.HasShadow.call(entities.Dog.prototype, 32 * 1.1, 32 * 1.5);
mixins.Debuggable.call(entities.Dog.prototype);
