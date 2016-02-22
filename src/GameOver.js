var GameOver = function (config) {
    if (!config.stage) {
        log("GameOver config not properly set");
    }

    var gameOverMessage = createGameOverMessage(),
        shown = false,
        promiseCallback;

    function show() {
        shown = true;
        config.stage.addChild(gameOverMessage);

        createjs.Sound.play("gameOverSound");

        window.setTimeout(() => {
            hide();
            promiseCallback && promiseCallback();
        }, 5000);

        return new Promise((resolve, reject) => {
            promiseCallback = resolve;
        });
    }

    function hide() {
        if (!shown) { return; }
        config.stage.removeChild(gameOverMessage);
        shown = false;
    }

    function createGameOverMessage() {
        var gameOverMessage = new createjs.Bitmap(resources.gameOverImage);
        gameOverMessage.name = "gameOverMessage";
        gameOverMessage.x = CANVAS_WIDTH / 2 - gameOverMessage.getBounds().width / 2;
        gameOverMessage.y = CANVAS_HEIGHT / 2 - gameOverMessage.getBounds().height / 2 - 150;
        gameOverMessage.zindex = 1000;
        return gameOverMessage;
    }

    return {
        show: show
    };
};
