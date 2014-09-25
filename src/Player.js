var entities = entities || {};

var FRAME_WIDTH = 48,
    FRAME_HEIGHT =  96;

entities.Player = function(x, y, keyMap, keyboardState) {
    this.init();
    this.initPosition(x, y);
    this.setInputSource(new inputSources.Keyboard(keyMap, keyboardState));

    this.onUpdate(function (dt) {
        this.render();
    });
};

mixins.Initializable.call(entities.Player.prototype);
mixins.Updateable.call(entities.Player.prototype);
mixins.Simulable.call(entities.Player.prototype);
mixins.Positionable.call(entities.Player.prototype);
mixins.Renderable.call(entities.Player.prototype);

mixins.Sprite.call(entities.Player.prototype, {
    images: [resources.playerImage],
    frames: {
        width: FRAME_WIDTH,
        height: FRAME_HEIGHT,
        regX: FRAME_WIDTH / 2,
        regY: 88
    },
    animations: {
        idle: [0, 4, true, 0.1],
        moveDown: [8, 11, true, 0.2],
        moveLeft: [16, 23, true, 0.3],
        moveRight: [24, 31, true, 0.3],
        moveUp: [32, 35, true, 0.2]
    }
});

mixins.Alive.call(entities.Player.prototype);
mixins.Physical.call(entities.Player.prototype, { friction: 20, mass: 1 });

mixins.Collidable.call(entities.Player.prototype, {
    callback: function(intersection) {
        this.nextPos.x -= intersection.overlapV.x;
        this.nextPos.y -= intersection.overlapV.y;
    },
    hitAreaRadius: 36
});

mixins.HasShadow.call(entities.Player.prototype, FRAME_WIDTH * 1.1, FRAME_HEIGHT);
mixins.Debuggable.call(entities.Player.prototype);
