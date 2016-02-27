var Score = (function () {
    var level = 0,
        text;

    text = new createjs.Text("Level 0", "20px MineCrafter", "#222222");
    text.x = 50;
    text.y = 30;
    text.zindex = 1000;

    function increment() {
        level++;
        update();
    }

    function getDisplayObject() {
        return text;
    }

    function update() {
        text.text = "Level " + level;
        animateLevelChange();
    }

    function animateLevelChange() {
        var color = 255,
            setColor = (color) => {
                text.color = "rgb(" + color + ", " + color + ", " + color + ")";
            };

        text.scaleX = 5;
        text.scaleY = 5;
        setColor(color);
        text.on("tick", (e) => {
            text.scaleX -= 0.1;
            text.scaleY -= 0.1;

            setColor(color -= 5);
            if (text.scaleX <= 1) {
                text.scaleX = 1;
                text.scaleY = 1;
                setColor(0);
                e.remove();
            }
        });
    }

    function reset() {
        level = 0;
    }

    return {
        increment: increment,
        reset: reset,
        getDisplayObject: getDisplayObject
    };
})();
