var Splash = function (config) {
    if (!config.stage) {
        log("Splash config not properly set");
    }

    var splashMessage = createSplashMessage(),
        shown = false,
        onHideCallback;

    addEventListener();

    function show(callback) {
        config.stage.addChild(splashMessage);
        onHideCallback = callback;
        shown = true;
    };

    function hide() {
        if (!shown) { return; }
        config.stage.removeChild(splashMessage);
        onHideCallback && onHideCallback();
        shown = false;
    }

    function createSplashMessage() {
        var splashMessage = new createjs.Text("Pichicho Defender", "48px MineCrafter", "#222222");
        splashMessage.name = "splashMessage";
        splashMessage.x = CANVAS_WIDTH / 2 - splashMessage.getBounds().width / 2;
        splashMessage.y = CANVAS_HEIGHT / 2 - splashMessage.getBounds().height / 2;
        splashMessage.zindex = 1000;
        return splashMessage;
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
        show: show,
        hide: hide
    };
};
