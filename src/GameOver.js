var GameOver = function (config) {
    if (!config.stage) {
        log("GameOver config not properly set");
    }

    var gameOverMessage = createGameOverMessage(),
        shown = false,
        promiseCallback;

    return {
        show: show
    };

    function show() {
        config.stage.addChild(gameOverMessage);
        shown = true;

        window.setTimeout(() => {
            hide();
            if (typeof promiseCallback === 'function') {
                promiseCallback();
            }
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
        var gameOverMessage = new createjs.Text("Game Over", "48px MineCrafter", "#222222");
        gameOverMessage.name = "gameOverMessage";
        gameOverMessage.x = CANVAS_WIDTH / 2 - gameOverMessage.getBounds().width / 2;
        gameOverMessage.y = CANVAS_HEIGHT / 2 - gameOverMessage.getBounds().height / 2;
        gameOverMessage.zindex = 1000;
        return gameOverMessage;
    }

};
