var Splash = function (config) {
    if (!config.stage) {
        log("Splash config not properly set");
    }

    var splashImage = createSplashImage(),
        credits = createCredits(),
        shown = false,
        promiseCallback;

    addEventListener();

    function start() {
        config.stage.addChild(splashImage);
        config.stage.addChild(credits);
        shown = true;

        return new Promise((resolve) => {
            promiseCallback = resolve;
        });
    }

    function hide() {
        if (!shown) {
            return;
        }
        config.stage.removeChild(splashImage);
        config.stage.removeChild(credits);
        promiseCallback && promiseCallback();
        shown = false;
    }

    function createSplashImage() {
        var splash = new createjs.Bitmap(resources.splashImage);
        splash.name = "splashImage";
        splash.x = CANVAS_WIDTH / 2 - splash.getBounds().width / 2;
        splash.y = CANVAS_HEIGHT / 2 - splash.getBounds().height / 2 - 150;
        splash.zindex = 1000;
        return splash;
    }

    function createCredits() {
        var credits = new createjs.Text("Code: Pibi, Oso\nGraphics: Oso\nMusic: Nahue", "16px MineCrafter", "#222222");
        credits.name = "splashImage";
        credits.x = CANVAS_WIDTH - credits.getBounds().width - 100;
        credits.y = CANVAS_HEIGHT - credits.getBounds().height - 50;
        credits.zindex = 1000;
        return credits;
    }

    function addEventListener() {
        var keyupCallback = (e) => {
            if (e.keyCode === 13) {
                hide();
            }
        };
        document.addEventListener("keyup", keyupCallback);
    }

    return {
        start: start
    };
};
