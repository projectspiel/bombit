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

entities.Player.includeMixin( mixins.Initializable );
entities.Player.includeMixin( mixins.Updateable );
entities.Player.includeMixin( mixins.Simulable );
entities.Player.includeMixin( mixins.Positionable );
entities.Player.includeMixin( mixins.Renderable );

entities.Player.includeMixin( mixins.Sprite, {
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

entities.Player.includeMixin( mixins.Alive );
entities.Player.includeMixin( mixins.Physical, { friction: 20, mass: 1 });

entities.Player.includeMixin( mixins.Collidable, {
    callback: function(intersection) {
        this.nextPos.x -= intersection.overlapV.x;
        this.nextPos.y -= intersection.overlapV.y;
    },
    hitAreaRadius: 36
});

entities.Player.includeMixin( mixins.HasShadow, FRAME_WIDTH * 1.1, FRAME_HEIGHT );
entities.Player.includeMixin( mixins.Debuggable );

