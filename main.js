/* global constants:true */
constants = {
    KEY_UP: 38,
    KEY_LEFT: 37,
    KEY_RIGHT: 39,
    KEY_DOWN: 40,
    KEY_W: 87,
    KEY_A: 65,
    KEY_S: 83,
    KEY_D: 68,
    KEY_SPACE: 32
};

var CANVAS_HEIGHT,
    CANVAS_WIDTH,
    MAP_HEIGHT = 1000,
    MAP_WIDTH = 1000,
    FRAME_RATE = 60;

// Debugging
Debug = {
    positionable: false,
    collidable: false,
    physical: false
};

/* global resources:true */
resources = {};
/* global world:true */
var world = null;

window.onload = function () {
    var preloader = new createjs.LoadQueue(false),
        canvas = window.document.getElementById("dasCanvas"),
        context = canvas.getContext("2d");

    CANVAS_HEIGHT = canvas.height;
    CANVAS_WIDTH = canvas.width;
    context.imageSmoothingEnabled = false;

    drawProgressbarContainer(canvas);
    preloader.on("progress", (event) => {
        updateProgressbar(canvas, event.loaded);
    });

    preloader.on("fileload", (event) => {
        var item = event.item;
        switch (item.type) {
            case createjs.LoadQueue.IMAGE:
                var img = new Image();
                img.src = item.src;
                resources[item.id] = img;
                break;

            case createjs.LoadQueue.SOUND:
                break;

            case createjs.LoadQueue.JAVASCRIPT:
                // createjs.LoadQueue(false) auto-adds scripts to the DOM
                break;
        }
    });

    preloader.on("complete", () => {
        world = new World(canvas);
        world.start();
    });

    preloader.installPlugin(createjs.Sound);
    preloader.loadManifest("resources_manifest.json");
    preloader.loadManifest("sources_manifest.json");
};

window.onblur = () => {
    world.pause();
};

window.onfocus = () => {
    world.resume();
};

window.log = () => {
    for (var i = 0; i < arguments.length; i++) {
        if (!arguments[i]) {
            console.log("Invalid argument for logging");
        }
        console.log(arguments[i].toString ? arguments[i].toString() : arguments[i]);
    }
};

Function.prototype.includeMixin = function (mixin) {
    mixin.apply(this.prototype, Array.prototype.slice.call(arguments, 1));
    return this;
};

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function drawProgressbarContainer(canvas) {
    var context = canvas.getContext("2d");
    context.strokeStyle = "white";
    context.lineWidth = 5;

    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
    context.stroke();

    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 120, 0, 2 * Math.PI);
    context.stroke();

    context.fillStyle = "white";
    context.font = "18px monospace";
    context.textAlign = "center";
    context.fillText("Loading...", canvas.width / 2 + 10, canvas.height / 2);
}

function updateProgressbar(canvas, loaded) {
    var context = canvas.getContext("2d"),
        angle = Math.PI * 2 * loaded;

    var gradient = context.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 100,
        canvas.width / 2, canvas.height / 2, 120
    );
    gradient.addColorStop(0,"white");
    gradient.addColorStop(0.5,"#5F9F9F");
    gradient.addColorStop(1,"white");
    context.strokeStyle = gradient;
    context.lineWidth = 15;

    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, 110, 0, angle);
    context.stroke();
}
